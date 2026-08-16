'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, Clock, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRequestCallback } from "@/components/request-callback-provider";
import BookAppointmentButton from "@/components/book-appointment-button";
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { submitContactLead } from '../actions/lead-actions';
import { withStoredAttribution } from '@/lib/growth-attribution';
import { useToast } from '@/hooks/use-toast';

const countryContacts = [
    { name: "India", email: "india@ariesphysiocare.com", phone: "+91 98765 43210", flag: "🇮🇳" },
    { name: "UAE", email: "uae@ariesphysiocare.com", phone: "+971 55 123 4567", flag: "🇦🇪" },
    { name: "UK", email: "uk@ariesphysiocare.com", phone: "+44 20 7123 4567", flag: "🇬🇧" },
];

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email(),
    phone: z.string().min(1, "Phone is required"),
    country: z.string().optional(),
    city: z.string().optional(),
    enquiryType: z.string().min(1, "Please select an enquiry type"),
    message: z.string().min(1, "Message is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
    const { openModal } = useRequestCallback();
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { toast } = useToast();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: "", email: "", phone: "", country: "", city: "", enquiryType: "", message: "" },
    });

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true);
        const result = await submitContactLead(withStoredAttribution(data));
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
                            <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground tracking-tight">Contact Aries PhysioCare</h1>
                            <p className="mt-4 text-lg md:text-xl text-muted-foreground">We’re Here to Support Your Health Journey — Anywhere You Are</p>
                            <p className="mt-4 max-w-2xl mx-auto text-sm text-muted-foreground/80">Reach out for services, partnerships, careers, or general enquiries.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div className="space-y-8">
                            <Card className="glassmorphic">
                                <CardHeader><CardTitle className="font-headline text-2xl">Global Head Office</CardTitle></CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-muted-foreground">Aries HealthCare International Pvt Ltd</p>
                                    <div className="flex items-center gap-4"><Mail className="h-5 w-5 text-primary" /><a href="mailto:info@ariesphysiocare.com" className="hover:text-primary">info@ariesphysiocare.com</a></div>
                                    <div className="flex items-center gap-4"><Phone className="h-5 w-5 text-primary" /><span>+[Global Contact Number]</span></div>
                                    <div className="flex items-center gap-4"><Clock className="h-5 w-5 text-primary" /><span>Mon–Sat | 8 AM – 8 PM</span></div>
                                </CardContent>
                            </Card>
                            <div>
                                <h2 className="font-headline text-3xl font-bold mb-6">Our Global Presence</h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {countryContacts.map(country => (
                                        <Card key={country.name} className="glassmorphic">
                                            <CardHeader><CardTitle className="flex items-center gap-3 font-headline text-xl"><span>{country.flag}</span><span>{country.name}</span></CardTitle></CardHeader>
                                            <CardContent className="space-y-2 text-sm">
                                                <div className="flex items-center gap-2 text-muted-foreground"><Mail className="h-4 w-4" /><a href={`mailto:${country.email}`} className="break-all hover:text-primary">{country.email}</a></div>
                                                <div className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4" /><span>{country.phone}</span></div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        <Card className="glassmorphic p-8">
                            {isSubmitted ? (
                                <div className="flex flex-col items-center justify-center text-center p-8 h-full">
                                    <div className="mx-auto bg-green-500/10 text-green-500 p-4 rounded-full w-fit mb-4"><CheckCircle className="h-10 w-10" /></div>
                                    <h3 className="font-headline text-2xl">Thank You!</h3>
                                    <p className="text-muted-foreground mt-2">Your enquiry has been submitted. Our team will get back to you shortly.</p>
                                    <Button onClick={() => { setIsSubmitted(false); form.reset(); }} className="mt-6">Submit Another Enquiry</Button>
                                </div>
                            ) : (
                                <>
                                    <CardHeader>
                                        <CardTitle className="font-headline text-2xl">Get in Touch</CardTitle>
                                        <CardDescription>Fill out the form below and we will get back to you shortly.</CardDescription>
                                    </CardHeader>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-6 pb-6">
                                            <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormControl><Input placeholder="Full Name" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                            <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormControl><Input placeholder="Email Address" type="email" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                            <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormControl><Input placeholder="Phone Number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                            <div className="grid grid-cols-2 gap-4">
                                                <FormField control={form.control} name="country" render={({ field }) => (<FormItem><FormControl><Input placeholder="Country" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                                <FormField control={form.control} name="city" render={({ field }) => (<FormItem><FormControl><Input placeholder="City" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                            </div>
                                            <FormField control={form.control} name="enquiryType" render={({ field }) => (
                                                <FormItem>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl><SelectTrigger><SelectValue placeholder="Select Enquiry Type" /></SelectTrigger></FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="services">Services</SelectItem>
                                                            <SelectItem value="careers">Careers</SelectItem>
                                                            <SelectItem value="corporate">Corporate</SelectItem>
                                                            <SelectItem value="investment">Investment</SelectItem>
                                                            <SelectItem value="general">General Enquiry</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                            <FormField control={form.control} name="message" render={({ field }) => (<FormItem><FormControl><Textarea placeholder="Your Message" rows={4} {...field} /></FormControl><FormMessage /></FormItem>)} />
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
            <section className="py-16 md:py-24 bg-secondary/30">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto"><h2 className="font-headline text-3xl md:text-4xl font-bold">Aries PhysioCare Availability Map</h2></div>
                    <div className="flex justify-center items-center h-96 mt-12 glassmorphic rounded-lg"><p className="text-muted-foreground">Live service availability map will be displayed here.</p></div>
                </div>
            </section>
            <section className="py-16">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="glassmorphic rounded-lg p-8 text-center max-w-3xl mx-auto">
                        <h3 className="font-headline text-2xl font-bold">Looking for trusted home healthcare services?</h3>
                        <p className="mt-2 text-muted-foreground">Our team is just a call away.</p>
                        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                            <BookAppointmentButton size="lg" className="neon-accent-border">Book Appointment</BookAppointmentButton>
                            <Button size="lg" variant="outline" onClick={() => openModal()}>Request a Call Back</Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}