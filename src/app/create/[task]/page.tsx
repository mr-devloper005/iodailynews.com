import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { CreateTaskForm } from "./create-task-form";

export default function CreateTaskPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <CreateTaskForm />
      <Footer />
    </div>
  );
}
