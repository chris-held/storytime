import Header from "@/components/common/Header";
import "./globals.css";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Storytime",
  description: "Browse or create AI Generated Childrens Stories",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-background flex flex-col items-center">
          <div className="w-full flex flex-col items-center">
            <Header />
            <div className="flex flex-col gap-14 max-w-4xl w-full px-3 py-16 lg:py-24 text-foreground">
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
