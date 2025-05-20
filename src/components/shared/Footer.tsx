import {
    Footer,
    FooterColumn,
    FooterBottom,
    FooterContent,
  } from "@/components/ui/footer";
  import LaunchUI from "@/components/logos/launch-ui";
  import Link from "next/link";
import { ArrowBigDown } from "lucide-react";

  
  export default function FooterSection() {
    return (
      <footer className="bg-background w-full relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 [background-image:linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(to_right,#e5e7eb_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <Footer className="border-t pt-16 relative">
          <div className="container mx-auto px-4">
            <FooterContent className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              <FooterColumn className="space-y-6">
                <div className="flex items-center gap-3 group">
                  <div className="p-2 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-lg shadow-lg">
                    <LaunchUI className="text-white w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                    Launch UI
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Crafting beautiful interfaces for the modern web. Open-source components built with passion.
                </p>
               
              </FooterColumn>
              
              <FooterColumn>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                 
                  Company
                </h3>
                <div className="space-y-3">
                  {['About', 'Careers', 'Blog'].map((item) => (
                    <Link
                      key={item}
                      href="#"
                      className="group text-muted-foreground text-sm flex items-center hover:text-purple-600 transition-colors"
                    >
                      {item}
                      <ArrowBigDown className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </FooterColumn>
            
              <FooterColumn>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-purple-500">
                    <path d="M12 1l9.5 5.5v11L12 23l-9.5-5.5v-11L12 1zm0 2.311L4.5 7.653v8.694l7.5 4.342 7.5-4.342V7.653L12 3.311zM12 16a4 4 0 110-8 4 4 0 010 8zm0-2a2 2 0 100-4 2 2 0 000 4z"/>
                  </svg>
                  Legal
                </h3>
                <div className="space-y-3">
                  {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                    <Link
                      key={item}
                      href="#"
                      className="text-muted-foreground text-sm flex items-center hover:text-blue-500 transition-colors"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </FooterColumn>

              <FooterColumn>
                <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
                <div className="space-y-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 rounded-lg border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                    Subscribe
                  </button>
                </div>
              </FooterColumn>
            </FooterContent>

            <FooterBottom className="border-t mt-12 py-8">
              <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2 mb-4 md:mb-0">
                  <LaunchUI className="w-4 h-4" />
                  <span>© 2025 Launch UI. All rights reserved</span>
                </div>
                <div className="flex gap-6">
                  <Link href="#" className="hover:text-purple-600 transition-colors">Accessibility</Link>
                  <Link href="#" className="hover:text-blue-500 transition-colors">Status</Link>
                  <Link href="#" className="hover:text-purple-600 transition-colors">Docs</Link>
                </div>
              </div>
            </FooterBottom>
          </div>
        </Footer>
      </footer>
    );
  }