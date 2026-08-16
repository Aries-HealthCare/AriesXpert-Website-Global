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
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle, Loader2, CreditCard, Smartphone, Banknote, ShieldCheck, Sparkles, TrendingDown } from 'lucide-react';
import AppointmentCalendar from './AppointmentCalendar';
import { TimeSlots } from './TimeSlots';
import { submitAppointmentLead } from '@/app/actions/lead-actions';
import { getStoredAttribution } from '@/lib/growth-attribution';
import { useToast } from '@/hooks/use-toast';
import { trackEvent } from '@/lib/analytics';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { STANDARD_PRICING_TIERS, getTierForLocation } from '@/lib/pricing-packages';

const steps = [
  { id: 'profile', title: 'Profile' },
  { id: 'schedule', title: 'Schedule' },
  { id: 'payment', title: 'Payment Preference' },
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
  const searchParams = useSearchParams();
  const initialTierParam = searchParams?.get('tier') || '';
  const initialPkgParam = searchParams?.get('package') || '1';

  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedPlanDays, setSelectedPlanDays] = useState<string>(['10', '15', '20', '30'].includes(initialPkgParam) ? initialPkgParam : '1');
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
  const selectedArea = form.watch('area');
  const selectedAddress = form.watch('address');
  const selectedTime = form.watch('time');
  const selectedDate = form.watch('date');
  const paymentMethod = form.watch('paymentMethod');

  const states = IndianStates;
  const cities = states.find(s => s.slug === selectedState)?.cities || [];
  const areas = cities.find(c => c.slug === selectedCity)?.areas || [];

  const locationTier = React.useMemo(() => {
    if (initialTierParam && STANDARD_PRICING_TIERS[initialTierParam]) {
      return STANDARD_PRICING_TIERS[initialTierParam];
    }
    const locationString = `${selectedArea} ${selectedCity} ${selectedAddress}`;
    return getTierForLocation(locationString);
  }, [selectedArea, selectedCity, selectedAddress, initialTierParam]);

  const planPricing = React.useMemo(() => {
    if (selectedPlanDays === '10') {
      const p = locationTier.packages.days10;
      return { days: 10, title: '10 Days Recovery Plan', rate: p.ratePerSession, total: p.totalPrice, savings: p.totalSavings };
    }
    if (selectedPlanDays === '15') {
      const p = locationTier.packages.days15;
      return { days: 15, title: '15 Days Rehabilitation Plan', rate: p.ratePerSession, total: p.totalPrice, savings: p.totalSavings };
    }
    if (selectedPlanDays === '20') {
      const p = locationTier.packages.days20;
      return { days: 20, title: '20 Days Intensive Rehab', rate: p.ratePerSession, total: p.totalPrice, savings: p.totalSavings };
    }
    if (selectedPlanDays === '30') {
      const p = locationTier.packages.days30;
      return { days: 30, title: '30 Days Complete Care Plan', rate: p.ratePerSession, total: p.totalPrice, savings: p.totalSavings };
    }
    return { days: 1, title: 'Single Assessment & Treatment Session', rate: locationTier.basePrice, total: locationTier.basePrice, savings: 0 };
  }, [selectedPlanDays, locationTier]);

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
    const result = await submitAppointmentLead({
      ...data,
      country: 'India',
      ...getStoredAttribution(),
      planDays: selectedPlanDays,
      pricing: planPricing
    } as any);
    
    if (result.error) {
        toast({ variant: "destructive", title: "Submission Failed", description: result.error });
    } else {
        trackEvent('generate_lead_appointment', { service: data.service, plan: selectedPlanDays });
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
        <h3 className="font-headline text-3xl font-bold tracking-tight">Appointment Request Received</h3>
        <p className="text-muted-foreground mt-4 max-w-sm font-medium leading-relaxed">
          Your preferred visit details were submitted. A clinical coordinator will confirm the therapist, time, and payment instructions before the appointment is booked.
        </p>
        <Button onClick={onSubmitted} className="mt-10 h-14 px-10 rounded-xl font-black text-xs uppercase tracking-widest neon-accent-border">
          Return to Hub
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("bg-card text-card-foreground p-6 md:p-12 border border-primary/10 rounded-[3rem] shadow-2xl relative overflow-hidden", className)}>
      <div className="flex justify-between items-center mb-10 max-w-2xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-black text-xs transition-all duration-500 border",
              currentStep === index 
                ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30 ring-4 ring-primary/10" 
                : currentStep > index 
                  ? "bg-accent/20 border-accent text-accent-foreground" 
                  : "bg-muted/40 border-border/20 text-muted-foreground"
            )}>
              {currentStep > index ? <CheckCircle className="w-5 h-5" /> : index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className={cn(
                "h-[2px] w-8 md:w-16 mx-2 transition-all duration-500",
                currentStep > index ? "bg-primary" : "bg-border/20"
              )} />
            )}
          </div>
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardHeader className="text-center p-0 mb-8">
            <CardTitle className="font-headline text-2xl md:text-3xl font-bold">
              {steps[currentStep].title}
            </CardTitle>
            <CardDescription className="text-xs uppercase tracking-widest font-black text-primary/80 mt-1">
              Step {currentStep + 1} of {steps.length} • Verified Home Visit Protocol
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 max-w-3xl mx-auto">
            {currentStep === 0 && (
              <div className="space-y-6 animate-reveal-up">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[11px] font-black uppercase tracking-widest">Patient Name</FormLabel>
                      <FormControl><Input placeholder="e.g. Rahul Sharma" {...field} className="h-14 bg-background/40" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[11px] font-black uppercase tracking-widest">WhatsApp / Phone</FormLabel>
                      <FormControl><Input placeholder="e.g. 9876543210" {...field} className="h-14 bg-background/40" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[11px] font-black uppercase tracking-widest">Email Address</FormLabel>
                    <FormControl><Input placeholder="e.g. rahul@gmail.com" {...field} className="h-14 bg-background/40" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField control={form.control} name="state" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[11px] font-black uppercase tracking-widest">State</FormLabel>
                      <Select onValueChange={(val) => { field.onChange(val); form.setValue('city', ''); form.setValue('area', ''); }} defaultValue={field.value}>
                        <FormControl><SelectTrigger className="h-14 bg-background/40"><SelectValue placeholder="State" /></SelectTrigger></FormControl>
                        <SelectContent className="glassmorphic">{states.map(s => <SelectItem key={s.slug} value={s.slug}>{s.name}</SelectItem>)}</SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[11px] font-black uppercase tracking-widest">City</FormLabel>
                      <Select onValueChange={(val) => { field.onChange(val); form.setValue('area', ''); }} value={field.value} disabled={!selectedState}>
                        <FormControl><SelectTrigger className="h-14 bg-background/40"><SelectValue placeholder="City" /></SelectTrigger></FormControl>
                        <SelectContent className="glassmorphic">{cities.map(c => <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>)}</SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="area" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[11px] font-black uppercase tracking-widest">Area Hub</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} disabled={!selectedCity}>
                        <FormControl><SelectTrigger className="h-14 bg-background/40"><SelectValue placeholder="Area" /></SelectTrigger></FormControl>
                        <SelectContent className="glassmorphic">{areas.map(a => <SelectItem key={a.slug} value={a.slug}>{a.name}</SelectItem>)}</SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="address" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[11px] font-black uppercase tracking-widest">Complete Visit Address (Flat / Wing / Landmark)</FormLabel>
                    <FormControl><Textarea placeholder="e.g. Flat 402, Sea Breeze Apts, Bandra West, Mumbai 400050" {...field} className="h-24 bg-background/40 resize-none" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-8 animate-reveal-up">
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

                <div className="space-y-3 p-5 rounded-2xl bg-white/[0.02] border border-primary/10">
                  <div className="flex items-center justify-between">
                    <Label className="text-[11px] font-black uppercase tracking-widest text-primary flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Select Treatment Plan (Location-Based Savings)
                    </Label>
                    <Badge variant="outline" className="text-[10px] font-mono text-cyan-400 border-cyan-500/30">
                      ₹{locationTier.basePrice} / session
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                    {[
                      { id: '1', name: '1 Session', rate: `₹${locationTier.basePrice}`, total: `₹${locationTier.basePrice}`, badge: 'Single Visit' },
                      { id: '10', name: '10 Days Plan', rate: `₹${locationTier.packages.days10.ratePerSession}/sess`, total: `₹${locationTier.packages.days10.totalPrice}`, badge: `Save ₹${locationTier.packages.days10.totalSavings}` },
                      { id: '15', name: '15 Days Plan', rate: `₹${locationTier.packages.days15.ratePerSession}/sess`, total: `₹${locationTier.packages.days15.totalPrice}`, badge: `Save ₹${locationTier.packages.days15.totalSavings}` },
                      { id: '20', name: '20 Days Plan', rate: `₹${locationTier.packages.days20.ratePerSession}/sess`, total: `₹${locationTier.packages.days20.totalPrice}`, badge: `Save ₹${locationTier.packages.days20.totalSavings}` },
                      { id: '30', name: '30 Days Plan', rate: `₹${locationTier.packages.days30.ratePerSession}/sess`, total: `₹${locationTier.packages.days30.totalPrice}`, badge: `★ Save ₹${locationTier.packages.days30.totalSavings}`, highlight: true },
                    ].map((plan) => {
                      const isSelected = selectedPlanDays === plan.id;
                      return (
                        <button
                          key={plan.id}
                          type="button"
                          onClick={() => setSelectedPlanDays(plan.id)}
                          className={cn(
                            'p-3 rounded-xl border text-left transition-all space-y-1',
                            isSelected
                              ? 'bg-primary/10 border-primary shadow-md shadow-primary/20 ring-1 ring-primary'
                              : 'bg-background/40 border-border/20 hover:border-primary/30 hover:bg-background/60'
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-foreground">{plan.name}</span>
                          </div>
                          <p className="text-[11px] font-mono font-bold text-primary">{plan.total}</p>
                          <p className="text-[9px] text-muted-foreground">{plan.rate}</p>
                          <span className={cn(
                            'inline-block text-[9px] font-bold px-1.5 py-0.5 rounded',
                            plan.highlight ? 'bg-purple-500/20 text-purple-300' : 'bg-emerald-500/10 text-emerald-400'
                          )}>
                            {plan.badge}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

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
                          <FormLabel className="text-[11px] font-black uppercase tracking-widest">Preferred Times</FormLabel>
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
                        <FormControl><Input placeholder="e.g. Lower Back Pain, Knee Rehab, Stroke" {...field} disabled={!!condition} className="h-12 bg-background/40" /></FormControl>
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
                  <h3 className="text-xl font-bold font-headline">Select Payment Preference</h3>
                  <p className="text-sm text-muted-foreground">Clinical sessions are billed transparently. Digital receipt shared post-visit.</p>
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
                    Selected Plan: <strong className="text-foreground">{planPricing.title}</strong> ({locationTier.name}). Estimated rate: <strong className="text-emerald-400 font-mono">₹{planPricing.rate}/session</strong>. Total: <strong className="text-emerald-400 font-mono">₹{planPricing.total}</strong> {planPricing.savings > 0 && `(Savings: ₹${planPricing.savings})`}.
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
                        <div className="space-y-1">
                          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary/60">Selected Recovery Plan</p>
                          <p className="text-base font-bold text-foreground">{planPricing.title}</p>
                          <Badge variant="outline" className="text-[10px] text-cyan-400 font-mono mt-1">
                            {locationTier.name} [{locationTier.badge}]
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary/60">Transparent Pricing</p>
                          <p className="text-xl font-black text-emerald-400 font-mono">₹{planPricing.total.toLocaleString('en-IN')}</p>
                          {planPricing.savings > 0 && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold">
                              <TrendingDown className="w-3 h-3" />
                              Package Savings: ₹{planPricing.savings.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="pt-8 border-t border-primary/10 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent-foreground"><Smartphone className="w-5 h-5"/></div>
                          <div>
                            <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Payment Preference</p>
                            <p className="text-sm font-bold uppercase tracking-wider">{form.getValues('paymentMethod')} - instructions pending confirmation</p>
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
                    {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting Request...</> : 'Submit Appointment Request'}
                  </Button>
              )}
            </div>
          </CardFooter>
        </form>
      </Form>
    </div>
  );
}
