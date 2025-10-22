import DashboardLayout from "@/components/DashboardLayout";

const Items = () => {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Items</h1>
        <p className="text-muted-foreground">All your saved items in one place</p>
      </div>
    </DashboardLayout>
  );
};

export default Items;
