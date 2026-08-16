'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Calendar as CalendarIcon, CheckCircle2, ArrowLeft, ShieldCheck } from 'lucide-react';
import { scheduleConsultation } from '@/services/telehealth-api';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import AppointmentCalendar from '@/components/AppointmentCalendar';
import { TimeSlots } from '@/components/TimeSlots';

const intakeSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  age: z.string().transform(v => parseInt(v, 10)).pipe(z.number().min(1).max(120)),
  gender: z.enum(['male', 'female', 'other']),
  address: z.string().min(5, 'Full address is required'),
  mobile: z.string().min(10, 'Valid mobile number is required'),
  email: z.string().email('Invalid email address'),
  condition: z.string().min(10, 'Please describe your condition in at least 10 characters'),
  date: z.date().optional(),
  time: z.string().optional(),
});

type FormValues = z.infer<typeof intakeSchema>;

export default function IntakeForm({ therapistId }: { therapistId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(intakeSchema),
    defaultValues: {
      fullName: '',
      gender: 'male',
      address: '',
      mobile: '',
      email: '',
      condition: '',
      time: '',
    },
  });

  const selectedDate = form.watch('date');
  const selectedTime = form.watch('time');

  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

  const handleAction = async () => {
    const isValid = await form.trigger(['fullName', 'age', 'gender', 'address', 'mobile', 'email', 'condition']);
    if (!isValid) return;

    if (!therapistId) {
      toast({ variant: 'destructive', title: 'Specialist Required', description: 'Please return to the directory and select an approved specialist.' });
      return;
    }

    if (!showScheduler) {
      setShowScheduler(true);
      return;
    }

    if (!selectedDate || !selectedTime) {
      toast({ variant: 'destructive', title: 'Selection Required', description: 'Please select a date and time slot.' });
      return;
    }

    setIsSubmitting(true);
    const data = form.getValues() as any;

    try {
      await scheduleConsultation(data, therapistId, selectedDate, selectedTime);
      setIsBooked(true);
      toast({ title: 'Request Received', description: 'Our team will verify the specialist and preferred time before confirming.' });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Request Failed',
        description: error instanceof Error ? error.message : 'Could not submit the request.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isBooked) {
    return (
      <Card className="glassmorphic p-12 text-center animate-in zoom-in-95">
        <div className="mx-auto w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="font-headline text-3xl font-bold mb-4">Consultation Request Received</h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
          Your preferred date and time were submitted. This is not yet a confirmed appointment; our team will contact you with availability and secure joining details.
        </p>
        <Button size="lg" className="px-12" onClick={() => router.push('/')}>Return Home</Button>
      </Card>
    );
  }

  return (
    <Form {...form}>
      <form className="space-y-8">
        {!showScheduler ? (
          <div className="animate-in slide-in-from-left duration-500">
            <Card className="glassmorphic border-primary/10 overflow-hidden">
              <CardContent className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} className="h-12 bg-background/50" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="mobile" render={({ field }) => (
                    <FormItem><FormLabel>Mobile Number</FormLabel><FormControl><Input placeholder="+91" {...field} className="h-12 bg-background/50" /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <FormField control={form.control} name="age" render={({ field }) => (
                    <FormItem><FormLabel>Age</FormLabel><FormControl><Input type="number" placeholder="30" {...field} className="h-12 bg-background/50" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="gender" render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4 pt-2">
                          <div className="flex items-center space-x-2"><RadioGroupItem value="male" id="m" /><Label htmlFor="m">Male</Label></div>
                          <div className="flex items-center space-x-2"><RadioGroupItem value="female" id="f" /><Label htmlFor="f">Female</Label></div>
                          <div className="flex items-center space-x-2"><RadioGroupItem value="other" id="o" /><Label htmlFor="o">Other</Label></div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email ID</FormLabel><FormControl><Input placeholder="you@example.com" {...field} className="h-12 bg-background/50" /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="address" render={({ field }) => (
                  <FormItem><FormLabel>Full Residential Address</FormLabel><FormControl><Textarea placeholder="Enter your full address..." {...field} className="bg-background/50" /></FormControl><FormMessage /></FormItem>
                )} />

                <FormField control={form.control} name="condition" render={({ field }) => (
                  <FormItem><FormLabel>Condition / Problem Description</FormLabel><FormControl><Textarea rows={4} placeholder="Describe your symptoms and how long they have lasted..." {...field} className="bg-background/50" /></FormControl><FormMessage /></FormItem>
                )} />

                <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-muted-foreground">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  Medical report upload is not available in this request form. Do not send reports or other sensitive records until the clinical team provides an approved secure channel.
                </div>
              </CardContent>
            </Card>

            <div className="mt-8">
              <Button 
                type="button" 
                variant="outline" 
                size="lg" 
                disabled={isSubmitting}
                onClick={handleAction}
                className="h-20 w-full text-xl font-bold glassmorphic border-primary/30"
              >
                <CalendarIcon className="mr-3 w-6 h-6 text-primary" /> Choose Preferred Time
              </Button>
            </div>
          </div>
        ) : (
          <div className="animate-in slide-in-from-right duration-500 space-y-8">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => setShowScheduler(false)} className="rounded-full">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Details
              </Button>
              <h2 className="font-headline text-2xl font-bold">Select Date & Time</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <AppointmentCalendar onDateSelect={field.onChange} selectedDate={field.value} />
                    <FormMessage className="pt-2" />
                  </FormItem>
                )}
              />
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[11px] font-black uppercase tracking-widest">Preferred Times</FormLabel>
                        <TimeSlots 
                            slots={timeSlots}
                            selected={selectedTime || null}
                            onSelect={field.onChange}
                        />
                      <FormMessage className="pt-2" />
                    </FormItem>
                  )}
                />
                {!timeSlots.length && selectedDate && (
                  <div className="text-xs font-bold text-muted-foreground/60 text-center bg-muted/20 p-6 rounded-2xl border border-dashed border-primary/10">
                    No clinical slots available for the selected date.
                  </div>
                )}
              </div>
            </div>

            <Button 
              type="button"
              className="w-full h-20 text-2xl font-black rounded-2xl neon-accent-border shadow-2xl transition-all"
              onClick={handleAction}
              disabled={isSubmitting || !selectedDate || !selectedTime}
            >
              {isSubmitting ? (
                <><Loader2 className="mr-2 animate-spin" /> Submitting Request...</>
              ) : (
                <><CheckCircle2 className="mr-3 w-6 h-6" /> Submit Consultation Request</>
              )}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
