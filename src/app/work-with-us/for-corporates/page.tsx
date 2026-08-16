'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { submitCorporateLead } from '@/app/actions/lead-actions';
import { withStoredAttribution } from '@/lib/growth-attribution';
import { useToast } from '@/hooks/use-toast';

const valueProps = [
    { title: "Employee Physiotherapy Programs" },
    { title: "On-Demand Home Healthcare" },
    { title: "Wellness & Injury Prevention Workshops" },
    { title: "Reduced Employee Absenteeism" },
    { title: "Customized Healthcare Plans" },
];

const formSchema = z.object({
    companyName: z.string().min(1, "Company name is required"),
    industryType: z.string().optional(),
    employeeCount: z.string().optional(),
    contactPerson: z.string().min(1, "Contact person is required"),
    email: z.string().email(),
    phone: z.string().min(1, "Phone is required"),
    location: z.string().optional(),
    requirement: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ForCorporatesPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { toast } = useToast();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { companyName: "", industryType: "", employeeCount: "", contactPerson: "", email: "", phone: "", location: "", requirement: "" },
    });

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true);
        const result = await submitCorporateLead(withStoredAttribution(data));
        if (result.error) {
            toast({ variant: 'destructive', title: 'Submission Failed', description: result.error });
        } else {
            setIsSubmitted(true);
        }
        setIsLoading(false);
    };

  return (
    <>
      <section className="relative w-full h-[50vh] md:h-[45vh] overflow-hidden">
        <div className="absolute inset-0 bg-secondary/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-4xl mx-auto glassmorphic rounded-2xl p-8">
              <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground tracking-tight">Corporate Healthcare Partnerships</h1>
              <p className="mt-4 text-lg md:text-xl text-muted-foreground">Enhance employee wellbeing with structured, professional home healthcare solutions.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-headline text-3xl font-bold mb-6">A Healthier Workforce is a More Productive Workforce</h2>
              <p className="text-muted-foreground mb-8">Aries PhysioCare partners with corporates to provide comprehensive home healthcare services, focusing on prevention, treatment, and overall wellness. Our programs are designed to reduce workplace injuries, improve employee health, and boost productivity.</p>
              <div className="space-y-4">
                {valueProps.map(prop => (<div key={prop.title} className="flex items-center gap-3"><CheckCircle className="h-6 w-6 text-primary" /><span className="font-medium text-lg">{prop.title}</span></div>))}
              </div>
            </div>
            
            <Card className="glassmorphic p-8">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center p-8 h-full">
                    <div className="mx-auto bg-green-500/10 text-green-500 p-4 rounded-full w-fit mb-4"><CheckCircle className="h-10 w-10" /></div>
                    <h3 className="font-headline text-2xl">Enquiry Submitted!</h3>
                    <p className="text-muted-foreground mt-2">Thank you for your interest. Our corporate partnerships team will contact you shortly.</p>
                    <Button onClick={() => { setIsSubmitted(false); form.reset(); }} className="mt-6">Submit Another Enquiry</Button>
                </div>
              ) : (
                <>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Enquire About a Partnership</CardTitle>
                        <CardDescription>Fill out the form below and our corporate team will get in touch.</CardDescription>
                    </CardHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-6 pb-6">
                            <FormField control={form.control} name="companyName" render={({ field }) => (<FormItem><FormControl><Input placeholder="Company Name" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="industryType" render={({ field }) => (<FormItem><FormControl><Input placeholder="Industry Type" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="employeeCount" render={({ field }) => (<FormItem><FormControl><Input placeholder="Number of Employees" type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="contactPerson" render={({ field }) => (<FormItem><FormControl><Input placeholder="Contact Person Name" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormControl><Input placeholder="Email Address" type="email" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormControl><Input placeholder="Phone Number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="location" render={({ field }) => (<FormItem><FormControl><Input placeholder="City / Country" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="requirement" render={({ field }) => (<FormItem><FormControl><Textarea placeholder="Describe your requirement..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <Button type="submit" disabled={isLoading} className="w-full neon-accent-border">
                                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : 'Submit Enquiry'}
                            </Button>
                        </form>
                    </Form>
                </>
              )}
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
