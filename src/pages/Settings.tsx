import DashboardLayout from "@/components/DashboardLayout";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Settings</h1>
        <p className="text-muted-foreground">Manage your preferences and account</p>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
