'use client';

import * as React from 'react';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { services } from '@/lib/placeholder-data';
import { IndianStates } from '@/lib/locations';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight, CheckCircle, Loader2, CreditCard, Smartphone, Banknote, ShieldCheck } from 'lucide-react';
import AppointmentCalendar from './AppointmentCalendar';
import { TimeSlots } from './TimeSlots';
import { submitAppointmentLead } from '@/app/actions/lead-actions';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const steps = [
  { id: 'profile', title: 'Profile' },
  { id: 'schedule', title: 'Schedule' },
  { id: 'payment', title: 'Payment' },
  { id: 'confirm', title: 'Finalize' },
];

const bookingSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Invalid email address'),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
  area: z.string().min(1, 'Area Hub is required'),
  address: z.string().min(1, 'Full address is required'),
  service: z.string().min(1, 'Service is required'),
  date: z.date({ required_error: 'Please select a date' }),
  time: z.string().min(1, 'Time is required'),
  paymentMethod: z.enum(['card', 'upi', 'cash']).default('card'),
  condition: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingFormProps {
    service?: string;
    condition?: string;
    onSubmitted?: () => void;
    className?: string;
}

export default function BookingForm({ service, condition, onSubmitted, className }: BookingFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      state: '',
      city: '',
      area: '',
      address: '',
      service: service || '',
      time: '',
      paymentMethod: 'card',
      condition: condition || '',
    },
  });

  const selectedState = form.watch('state');
  const selectedCity = form.watch('city');
  const selectedTime = form.watch('time');
  const selectedDate = form.watch('date');
  const paymentMethod = form.watch('paymentMethod');

  const states = IndianStates;
  const cities = states.find(s => s.slug === selectedState)?.cities || [];
  const areas = cities.find(c => c.slug === selectedCity)?.areas || [];

  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

  const nextStep = async () => {
    let fieldsToValidate: (keyof BookingFormValues)[] = [];
    switch (currentStep) {
        case 0: fieldsToValidate = ['fullName', 'phone', 'email', 'state', 'city', 'area', 'address']; break;
        case 1: fieldsToValidate = ['service', 'date', 'time']; break;
        case 2: fieldsToValidate = ['paymentMethod']; break;
    }
    
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => setCurrentStep(prev => prev - 1);

  const onSubmit = async (data: BookingFormValues) => {
    setIsLoading(true);
    // Simulated backend call
    const result = await submitAppointmentLead({ ...data, country: 'India' } as any);
    
    if (result.error) {
        toast({ variant: "destructive", title: "Submission Failed", description: result.error });
    } else {
        setIsSubmitted(true);
    }
    setIsLoading(false);
  };
  
  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 h-full bg-card text-card-foreground rounded-[2.5rem] glassmorphic">
        <div className="mx-auto bg-green-500/10 text-green-500 p-6 rounded-full w-fit mb-6 shadow-inner">
          <CheckCircle className="h-12 w-12" />
        </div>
        <h3 className="font-headline text-3xl font-bold tracking-tight">Appointment Booked!</h3>
        <p className="text-muted-foreground mt-4 max-w-sm font-medium leading-relaxed">
          Thank you for choosing Aries PhysioCare. Our clinical coordinator will call you within 15 minutes to finalize your expert visit.
        </p>
        <Button onClick={onSubmitted} className="mt-10 h-14 px-10 rounded-xl font-black text-xs uppercase tracking-widest neon-accent-border">
          Return to Hub
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("p-1", className)}>
      <div className="flex justify-center items-center mb-12 px-4 max-w-2xl mx-auto">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center text-center relative">
              <div className={cn(
                "w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm z-10",
                currentStep >= index ? 'bg-primary text-primary-foreground scale-110 shadow-primary/20' : 'bg-secondary/40 text-muted-foreground'
              )}>
                <span className="font-black text-xs">{index + 1}</span>
              </div>
              <p className={cn(
                "mt-3 text-[9px] font-black uppercase tracking-widest absolute -bottom-6 w-20 left-1/2 -translate-x-1/2 transition-colors duration-500",
                currentStep >= index ? 'text-primary' : 'text-muted-foreground/40'
              )}>{step.title}</p>
            </div>
            {index < steps.length - 1 && (
              <div className={cn(
                "flex-1 h-0.5 mx-2 rounded-full transition-colors duration-700",
                currentStep > index ? 'bg-primary' : 'bg-border/20'
              )} />
            )}
          </React.Fragment>
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
          <CardHeader className="px-0 pt-0 text-center space-y-2 mb-8">
            <CardTitle className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {currentStep === 3 ? "Final Diagnostic Review" : steps[currentStep].title}
            </CardTitle>
            <CardDescription className="text-base font-medium text-muted-foreground/80">Initialize your clinical recovery path with Aries PhysioCare.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-8 px-0 max-w-3xl mx-auto">
            {currentStep === 0 && (
              <div className="space-y-10 animate-reveal-up">
                <div className="space-y-6">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 flex items-center gap-2">
                    <CheckCircle className="w-3 h-3" /> Personal Information
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="fullName" render={({ field }) => (
                      <FormItem><FormLabel className="text-[11px] font-black uppercase tracking-widest">Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} className="h-12 bg-background/40" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem><FormLabel className="text-[11px] font-black uppercase tracking-widest">Mobile No.</FormLabel><FormControl><Input placeholder="+91" {...field} className="h-12 bg-background/40" /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel className="text-[11px] font-black uppercase tracking-widest">Email Address</FormLabel><FormControl><Input placeholder="you@example.com" {...field} className="h-12 bg-background/40" /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>

                <div className="space-y-6">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 flex items-center gap-2">
                    <CheckCircle className="w-3 h-3" /> Service Registry & Location
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FormField control={form.control} name="state" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[11px] font-black uppercase tracking-widest">State</FormLabel>
                        <Select onValueChange={(v) => { field.onChange(v); form.setValue('city', ''); form.setValue('area', ''); }}>
                          <FormControl><SelectTrigger className="h-12 bg-background/40"><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                          <SelectContent className="glassmorphic">{states.map(s => <SelectItem key={s.slug} value={s.slug}>{s.name}</SelectItem>)}</SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="city" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[11px] font-black uppercase tracking-widest">City</FormLabel>
                        <Select onValueChange={(v) => { field.onChange(v); form.setValue('area', ''); }} disabled={!selectedState}>
                          <FormControl><SelectTrigger className="h-12 bg-background/40"><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                          <SelectContent className="glassmorphic">{cities.map(c => <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>)}</SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="area" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[11px] font-black uppercase tracking-widest">Area Hub</FormLabel>
                        <Select onValueChange={field.onChange} disabled={!selectedCity}>
                          <FormControl><SelectTrigger className="h-12 bg-background/40"><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                          <SelectContent className="glassmorphic">{areas.map(a => <SelectItem key={a.slug} value={a.slug}>{a.name}</SelectItem>)}</SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem><FormLabel className="text-[11px] font-black uppercase tracking-widest">Full Home Visit Address</FormLabel><FormControl><Textarea placeholder="Enter your complete address for the expert visit..." {...field} className="bg-background/40" /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-10 animate-reveal-up">
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[11px] font-black uppercase tracking-widest">Select Clinical Service</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!!service}>
                        <FormControl>
                          <SelectTrigger className="h-14 bg-background/40 border-primary/10 rounded-xl"><SelectValue placeholder="Select a service" /></SelectTrigger>
                        </FormControl>
                        <SelectContent className="glassmorphic">
                          {services.map(s => (
                            <SelectItem key={s.id} value={s.slug}>{s.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
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
                          <FormLabel className="text-[11px] font-black uppercase tracking-widest">Available Slots</FormLabel>
                            <TimeSlots 
                                slots={timeSlots}
                                selected={selectedTime}
                                onSelect={field.onChange}
                            />
                          <FormMessage className="pt-2" />
                        </FormItem>
                      )}
                    />
                    <FormField control={form.control} name="condition" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[11px] font-black uppercase tracking-widest">Clinical Condition (Optional)</FormLabel>
                        <FormControl><Input placeholder="e.g. Lower Back Pain, Post-Op Care" {...field} disabled={!!condition} className="h-12 bg-background/40" /></FormControl>
                      </FormItem>
                    )} />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-10 animate-reveal-up">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/5 text-primary flex items-center justify-center mx-auto shadow-inner">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold font-headline">Select Payment Mode</h3>
                  <p className="text-sm text-muted-foreground">Clinical sessions are billed as per actual assessment. No upfront charges.</p>
                </div>

                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                        >
                          {[
                            { value: 'card', label: 'Credit / Debit', icon: CreditCard },
                            { value: 'upi', label: 'UPI / Digital', icon: Smartphone },
                            { value: 'cash', label: 'After Session', icon: Banknote },
                          ].map((method) => (
                            <FormItem key={method.value}>
                              <FormControl>
                                <RadioGroupItem value={method.value} id={method.value} className="sr-only" />
                              </FormControl>
                              <Label
                                htmlFor={method.value}
                                className={cn(
                                  "flex flex-col items-center justify-center gap-4 p-8 border-2 rounded-3xl cursor-pointer transition-all duration-500",
                                  paymentMethod === method.value 
                                    ? "border-primary bg-primary/5 text-primary shadow-lg shadow-primary/10" 
                                    : "border-border/10 hover:border-primary/20 hover:bg-muted/30"
                                )}
                              >
                                <method.icon className={cn("w-8 h-8", paymentMethod === method.value ? "text-primary" : "text-muted-foreground")} />
                                <span className="font-black text-[10px] uppercase tracking-[0.2em]">{method.label}</span>
                              </Label>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="p-6 bg-accent/5 border border-accent/20 rounded-2xl flex items-start gap-4">
                  <div className="p-2 bg-accent/20 rounded-lg text-accent-foreground shrink-0"><CheckCircle className="w-4 h-4" /></div>
                  <p className="text-xs font-medium text-muted-foreground leading-relaxed">
                    Note: For home visits, we follow a strictly transparent pricing registry. Your final bill will be shared digitally via the AriesXpert app after the clinical assessment.
                  </p>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-8 animate-reveal-up">
                  <div className="glassmorphic p-8 md:p-12 rounded-[2.5rem] border-primary/10 space-y-8 shadow-inner bg-primary/[0.02] relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-5"><ShieldCheck className="w-32 h-32 text-primary" /></div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
                        <div className="space-y-1">
                          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary/60">Clinical Service</p>
                          <p className="text-lg font-bold text-foreground">{services.find(s => s.slug === form.getValues('service'))?.name}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary/60">Schedule</p>
                          <p className="text-lg font-bold text-foreground">{form.getValues('date')?.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })} @ {form.getValues('time')}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary/60">Patient Contact</p>
                          <p className="text-lg font-bold text-foreground">{form.getValues('fullName')} • {form.getValues('phone')}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary/60">Visit Address</p>
                          <p className="text-sm font-medium text-muted-foreground leading-relaxed truncate">{form.getValues('address')}</p>
                        </div>
                      </div>

                      <div className="pt-8 border-t border-primary/10 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent-foreground"><Smartphone className="w-5 h-5"/></div>
                          <div>
                            <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Payment Method</p>
                            <p className="text-sm font-bold uppercase tracking-wider">{form.getValues('paymentMethod')} - Pay Post Assessment</p>
                          </div>
                        </div>
                        <div className="text-center sm:text-right">
                          <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Registry Verification</p>
                          <p className="text-xs font-black text-primary">2026 ACTIVE INTAKE</p>
                        </div>
                      </div>
                  </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between px-0 pt-10 mt-10 border-t border-primary/5 max-w-3xl mx-auto">
            {currentStep > 0 && (
              <Button type="button" variant="outline" onClick={prevStep} disabled={isLoading} className="h-14 px-8 rounded-xl font-bold uppercase text-[10px] tracking-[0.2em] border-primary/10 hover:bg-primary/5 transition-all">
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
            )}
             <div className={cn("flex-1 ml-4", currentStep === 0 && "ml-0 w-full")}>
              {currentStep < 3 ? (
                  <Button type="button" onClick={nextStep} className="w-full h-14 rounded-xl font-black uppercase text-xs tracking-[0.2em] shadow-lg shadow-primary/10 healthcare-motion">
                      Continue Protocol <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
              ) : (
                  <Button type="submit" disabled={isLoading} className="w-full h-16 rounded-xl font-black uppercase text-sm tracking-[0.2em] neon-accent-border shadow-2xl healthcare-motion transform hover:-translate-y-1">
                    {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Initializing Visit...</> : 'Finalize Expert Booking'}
                  </Button>
              )}
            </div>
          </CardFooter>
        </form>
      </Form>
    </div>
  );
}