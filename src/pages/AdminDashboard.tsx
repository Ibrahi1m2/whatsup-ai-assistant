import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Copy, RefreshCw, Mail, MessageSquare, User, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { format } from "date-fns";

interface FormSubmission {
  id: string;
  form_name: string;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  form_data: unknown;
  status: string;
  created_at: string;
  processed_at: string | null;
}

interface NotificationLog {
  id: string;
  submission_id: string;
  notification_type: string;
  recipient: string;
  status: string;
  error_message: string | null;
  created_at: string;
}

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [notifications, setNotifications] = useState<NotificationLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [webhookUrl, setWebhookUrl] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
    setWebhookUrl(`https://${projectId}.supabase.co/functions/v1/form-webhook`);
    fetchData();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("submissions-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "form_submissions" },
        () => fetchData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [submissionsRes, notificationsRes] = await Promise.all([
        supabase
          .from("form_submissions")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("notification_logs")
          .select("*")
          .order("created_at", { ascending: false }),
      ]);

      if (submissionsRes.data) setSubmissions(submissionsRes.data);
      if (notificationsRes.data) setNotifications(notificationsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const copyWebhookUrl = () => {
    navigator.clipboard.writeText(webhookUrl);
    toast({
      title: "Copied!",
      description: "Webhook URL copied to clipboard",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "notified":
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Notified</Badge>;
      case "processed":
        return <Badge className="bg-blue-500"><CheckCircle className="w-3 h-3 mr-1" />Processed</Badge>;
      case "failed":
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Failed</Badge>;
      case "sent":
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Sent</Badge>;
      default:
        return <Badge variant="secondary"><AlertCircle className="w-3 h-3 mr-1" />Pending</Badge>;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="w-4 h-4" />;
      case "whatsapp":
        return <MessageSquare className="w-4 h-4" />;
      case "admin":
        return <User className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  const getSubmissionNotifications = (submissionId: string) => {
    return notifications.filter((n) => n.submission_id === submissionId);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Form Submissions Dashboard</h1>
            <p className="text-muted-foreground mt-1">Monitor form submissions and notifications</p>
          </div>
          <Button onClick={fetchData} disabled={loading} variant="outline">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {/* Webhook URL Card */}
        <Card>
          <CardHeader>
            <CardTitle>Webhook URL</CardTitle>
            <CardDescription>
              Use this URL in Google Forms (via Make.com, Zapier, or Apps Script) to receive submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input value={webhookUrl} readOnly className="font-mono text-sm" />
              <Button onClick={copyWebhookUrl} variant="outline">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Connect this webhook to receive data from Google Forms. Supports Make.com, Zapier, or direct POST requests.
            </p>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{submissions.length}</div>
              <p className="text-sm text-muted-foreground">Total Submissions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-500">
                {submissions.filter((s) => s.status === "notified").length}
              </div>
              <p className="text-sm text-muted-foreground">Notified</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-500">
                {submissions.filter((s) => s.status === "pending").length}
              </div>
              <p className="text-sm text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-red-500">
                {submissions.filter((s) => s.status === "failed").length}
              </div>
              <p className="text-sm text-muted-foreground">Failed</p>
            </CardContent>
          </Card>
        </div>

        {/* Submissions List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
            <CardDescription>All form submissions with notification status</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : submissions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No submissions yet. Connect your Google Form to the webhook URL above.
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <Card key={submission.id} className="border">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{submission.customer_name || "Unknown"}</span>
                            {getStatusBadge(submission.status)}
                          </div>
                          {submission.customer_email && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Mail className="w-4 h-4" />
                              {submission.customer_email}
                            </div>
                          )}
                          {submission.customer_phone && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MessageSquare className="w-4 h-4" />
                              {submission.customer_phone}
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {format(new Date(submission.created_at), "PPp")}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground font-medium">Notifications:</p>
                          {getSubmissionNotifications(submission.id).map((notif) => (
                            <div key={notif.id} className="flex items-center gap-2 text-sm">
                              {getNotificationIcon(notif.notification_type)}
                              <span className="capitalize">{notif.notification_type}</span>
                              {getStatusBadge(notif.status)}
                            </div>
                          ))}
                          {getSubmissionNotifications(submission.id).length === 0 && (
                            <p className="text-xs text-muted-foreground">No notifications sent</p>
                          )}
                        </div>
                      </div>
                      {submission.form_data && typeof submission.form_data === 'object' && Object.keys(submission.form_data).length > 0 && (
                        <details className="mt-4">
                          <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                            View form data
                          </summary>
                          <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto">
                            {JSON.stringify(submission.form_data, null, 2)}
                          </pre>
                        </details>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
