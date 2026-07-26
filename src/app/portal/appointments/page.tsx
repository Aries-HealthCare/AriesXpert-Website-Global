
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarPlus, MapPin, Phone } from "lucide-react";
import BookAppointmentButton from "@/components/book-appointment-button";

const appointments = [
  { id: '1', date: 'Feb 12, 2026', time: '10:00 AM', service: 'Physiotherapy', therapist: 'Dr. Emily Carter', status: 'Confirmed', type: 'Home Visit' },
  { id: '2', date: 'Feb 15, 2026', time: '03:30 PM', service: 'Neuromuscular Rehab', therapist: 'Dr. Ben Adams', status: 'Pending', type: 'Home Visit' },
  { id: '3', date: 'Jan 28, 2026', time: '11:00 AM', service: 'Initial Assessment', therapist: 'Dr. Chloe Davis', status: 'Completed', type: 'Clinic' },
];

export default function AppointmentsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">My Appointments</h1>
          <p className="text-muted-foreground mt-1">Manage your upcoming and past healthcare sessions.</p>
        </div>
        <BookAppointmentButton className="neon-accent-border">
          <CalendarPlus className="w-4 h-4 mr-2" /> Book New Session
        </BookAppointmentButton>
      </div>

      <Card className="glassmorphic overflow-hidden">
        <CardHeader>
          <CardTitle className="font-headline">History & Upcoming</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="pl-6">Date & Time</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Therapist</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="pl-6">
                    <p className="font-medium">{app.date}</p>
                    <p className="text-xs text-muted-foreground">{app.time}</p>
                  </TableCell>
                  <TableCell className="font-medium">{app.service}</TableCell>
                  <TableCell>{app.therapist}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs">
                      {app.type === 'Home Visit' ? <MapPin className="w-3 h-3 text-primary" /> : <Phone className="w-3 h-3 text-primary" />}
                      {app.type}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      app.status === 'Confirmed' ? 'default' : 
                      app.status === 'Completed' ? 'secondary' : 'outline'
                    }>
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Button variant="ghost" size="sm">Manage</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
