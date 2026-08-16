'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Loader2 } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { submitInvestorLead } from '@/app/actions/lead-actions';
import { withStoredAttribution } from '@/lib/growth-attribution';
import { useToast } from '@/hooks/use-toast';


const formSchema = z.object({
    companyName: z.string().optional(),
    investorName: z.string().min(1, "Name is required"),
    email: z.string().email(),
    phone: z.string().min(1, "Phone is required"),
    country: z.string().optional(),
    investmentInterest: z.string().optional(),
    message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ForInvestorsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { toast } = useToast();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { companyName: "", investorName: "", email: "", phone: "", country: "", investmentInterest: "", message: "" },
    });

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true);
        const result = await submitInvestorLead(withStoredAttribution(data));
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
              <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground tracking-tight">Invest in the Future of Home Healthcare</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="font-headline text-3xl font-bold">A Scalable Model for a Growing Global Market</h2>
              <p>The demand for accessible, high-quality home healthcare is expanding at an unprecedented rate globally. Aries PhysioCare is strategically positioned at the forefront of this transformation, driven by a powerful combination of clinical excellence, technological innovation, and a scalable business model.</p>
              <p>Our foundation is built on standardized clinical protocols and a robust technology platform that ensures consistent, outcome-driven care across every city and country we operate in. This allows us to scale efficiently while maintaining the highest standards of quality that patients and partners expect.</p>
              <h3>The Market Opportunity</h3>
              <p>We are tapping into multiple high-growth sectors within the healthcare industry, including post-operative rehabilitation, geriatric care, chronic disease management, and preventive wellness. Our integrated digital health ecosystem is designed to capture these diverse markets under a single, trusted brand: Aries PhysioCare.</p>
              <p>We invite you to join us on our mission to build a global leader in home healthcare. Your investment will fuel our expansion, enhance our technology, and ultimately, bring hospital-level care to millions of homes worldwide.</p>
            </div>
            
            <Card className="glassmorphic p-8">
              {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center text-center p-8 h-full">
                      <div className="mx-auto bg-green-500/10 text-green-500 p-4 rounded-full w-fit mb-4"><CheckCircle className="h-10 w-10" /></div>
                      <h3 className="font-headline text-2xl">Thank You for Your Interest</h3>
                      <p className="text-muted-foreground mt-2">Our leadership team will be in touch with you shortly to discuss this opportunity.</p>
                      <Button onClick={() => { setIsSubmitted(false); form.reset(); }} className="mt-6">Submit Another Enquiry</Button>
                  </div>
              ) : (
                <>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Connect With Our Team</CardTitle>
                        <CardDescription>Please provide your details to start a conversation with our leadership.</CardDescription>
                    </CardHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-6 pb-6">
                            <FormField control={form.control} name="companyName" render={({ field }) => (<FormItem><FormControl><Input placeholder="Company / Fund Name" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="investorName" render={({ field }) => (<FormItem><FormControl><Input placeholder="Investor Name" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormControl><Input placeholder="Email Address" type="email" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormControl><Input placeholder="Phone Number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="country" render={({ field }) => (<FormItem><FormControl><Input placeholder="Country" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="investmentInterest" render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="Investment Interest" /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            <SelectItem value="seed">Seed / Angel</SelectItem>
                                            <SelectItem value="growth">Growth / Venture</SelectItem>
                                            <SelectItem value="strategic">Strategic Partnership</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="message" render={({ field }) => (<FormItem><FormControl><Textarea placeholder="Message (Optional)" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <Button type="submit" disabled={isLoading} className="w-full neon-accent-border">
                                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Connecting...</> : 'Connect With Us'}
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
