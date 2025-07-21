"use client";

import Link from "next/link";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

// This would come from your CMS in a real implementation
const faqCategories = [
  {
    id: "general",
    name: "General Questions",
    faqs: [
      {
        id: 1,
        question: "What is UCDC?",
        answer:
          "UCDC (Umiya Career Development Center) is an educational institution dedicated to providing quality coaching for competitive examinations like UPSC, GPSC, IELTS, and CDS. We offer comprehensive training programs, study materials, and facilities to help students achieve their career goals.",
      },
      {
        id: 2,
        question: "Where is UCDC located?",
        answer:
          "UCDC is located near Sardardham, S.G. Highway, Ahmedabad, Gujarat, India. We have a spacious campus with modern facilities including classrooms, library, computer lab, and accommodation.",
      },
      {
        id: 3,
        question: "What are the working hours of UCDC?",
        answer:
          "UCDC is open from Monday to Saturday, 9:00 AM to 6:00 PM. The library and study rooms are accessible to enrolled students from 8:00 AM to 10:00 PM every day.",
      },
      {
        id: 4,
        question: "How can I contact UCDC for inquiries?",
        answer:
          "You can contact us through phone at +91 98765 43210, email at info@ucdc.co.in, or visit our campus during working hours. You can also fill the contact form on our website.",
      },
    ],
  },
  {
    id: "admission",
    name: "Admission Process",
    faqs: [
      {
        id: 1,
        question: "How can I apply for admission to UCDC?",
        answer:
          "To apply for admission, you need to fill the entrance test form available on our website or at our campus. After submitting the form, you will be scheduled for an entrance test and interview.",
      },
      {
        id: 2,
        question: "Is there an entrance test for admission?",
        answer:
          "Yes, we conduct an entrance test to assess the aptitude and basic knowledge of candidates. The test is designed to evaluate your potential for the course you are applying for.",
      },
      {
        id: 3,
        question: "What is the fee structure for different courses?",
        answer:
          "The fee structure varies depending on the course and duration. Please contact our admission department for detailed information about fees for specific courses.",
      },
      {
        id: 4,
        question: "Do you offer any scholarships?",
        answer:
          "Yes, we offer scholarships to meritorious students based on their performance in the entrance test and previous academic records. We also have special scholarships for economically disadvantaged students.",
      },
      {
        id: 5,
        question: "What documents are required for admission?",
        answer:
          "For admission, you need to submit your educational certificates, identity proof, address proof, passport-sized photographs, and the completed application form.",
      },
    ],
  },
  {
    id: "courses",
    name: "Courses and Training",
    faqs: [
      {
        id: 1,
        question: "What courses are offered at UCDC?",
        answer:
          "UCDC offers comprehensive coaching for UPSC (Civil Services), GPSC (Gujarat Public Service Commission), IELTS (International English Language Testing System), and CDS (Combined Defense Services) examinations.",
      },
      {
        id: 2,
        question: "What is the duration of the courses?",
        answer:
          "The duration varies depending on the course. UPSC comprehensive programs typically run for 10-12 months, GPSC for 6-9 months, IELTS for 2-3 months, and CDS for 4-6 months. We also offer shorter, focused programs for specific exam components.",
      },
      {
        id: 3,
        question: "Do you provide study materials?",
        answer:
          "Yes, we provide comprehensive study materials for all our courses. These include printed notes, practice papers, current affairs compilations, and digital resources accessible through our student portal.",
      },
      {
        id: 4,
        question: "Are there mock tests and practice sessions?",
        answer:
          "Yes, regular mock tests and practice sessions are integral parts of our training methodology. We conduct weekly tests, provide detailed feedback, and organize special sessions for improving weak areas.",
      },
      {
        id: 5,
        question: "Do you offer online classes?",
        answer:
          "Yes, we offer both offline and online classes for most of our courses. Our digital platform provides live classes, recorded sessions, and interactive learning materials for remote students.",
      },
    ],
  },
  {
    id: "facilities",
    name: "Facilities and Accommodation",
    faqs: [
      {
        id: 1,
        question: "Do you provide accommodation facilities?",
        answer:
          "Yes, we provide hostel accommodation for both male and female students. Our hostels are located within the campus and offer a conducive environment for focused study.",
      },
      {
        id: 2,
        question: "What facilities are available in the hostel?",
        answer:
          "Our hostels are equipped with furnished rooms, 24/7 water and electricity supply, Wi-Fi, dining facilities, common study areas, and security. We maintain a disciplined and study-friendly environment.",
      },
      {
        id: 3,
        question: "Is there a library facility?",
        answer:
          "Yes, we have a well-stocked library with books, magazines, newspapers, and digital resources relevant to all the courses we offer. The library is open extended hours to facilitate student study.",
      },
      {
        id: 4,
        question: "Do you have computer facilities for students?",
        answer:
          "Yes, we have a modern computer lab with internet connectivity for students to access online resources, practice computer-based tests, and conduct research.",
      },
      {
        id: 5,
        question: "Is there a canteen on campus?",
        answer:
          "Yes, our campus has a canteen that serves nutritious meals and snacks at reasonable prices. We ensure hygiene and quality in food preparation.",
      },
    ],
  },
  {
    id: "results",
    name: "Results and Success Stories",
    faqs: [
      {
        id: 1,
        question:
          "What is the success rate of UCDC students in competitive exams?",
        answer:
          "UCDC has consistently maintained a high success rate in all the competitive exams we prepare students for. Over the past five years, we have achieved an average success rate of 65% in UPSC and GPSC examinations.",
      },
      {
        id: 2,
        question: "Can I see the testimonials of successful candidates?",
        answer:
          "Yes, you can find testimonials and success stories of our alumni on our website under the 'Alumni' section. We also organize interactive sessions with successful candidates for current students.",
      },
      {
        id: 3,
        question: "Do you provide placement assistance?",
        answer:
          "While our primary focus is on preparing students for competitive examinations, we do provide guidance and support for interview preparation and career planning.",
      },
      {
        id: 4,
        question: "How do you track the progress of students?",
        answer:
          "We have a comprehensive assessment system including regular tests, assignments, and mock exams. Students receive detailed feedback and personalized guidance based on their performance.",
      },
    ],
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFAQs, setFilteredFAQs] = useState(faqCategories);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredFAQs(faqCategories);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = faqCategories
      .map((category) => ({
        ...category,
        faqs: category.faqs.filter(
          (faq) =>
            faq.question.toLowerCase().includes(query) ||
            faq.answer.toLowerCase().includes(query)
        ),
      }))
      .filter((category) => category.faqs.length > 0);

    setFilteredFAQs(filtered);
  };

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-red-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to common questions about UCDC, our courses, and
              facilities
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 md:py-12 border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-xl mx-auto">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Search for questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1"
              />
              <Button
                onClick={handleSearch}
                className="bg-red-600 hover:bg-red-700"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((category) => (
              <div key={category.id} className="mb-10">
                <h2 className="text-2xl font-bold mb-6">{category.name}</h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.faqs.map((faq) => (
                    <AccordionItem
                      key={faq.id}
                      value={`${category.id}-${faq.id}`}
                    >
                      <AccordionTrigger className="text-left font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="text-gray-600 pt-2">{faq.answer}</div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <h3 className="text-xl font-medium mb-2">No results found</h3>
              <p className="text-gray-500">
                We couldn't find any FAQs matching your search. Please try
                different keywords or browse the categories below.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-12 md:py-16 bg-red-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
            Still Have Questions?
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-6">
            If you couldn't find the answer to your question, please feel free
            to contact us directly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-red-600 hover:bg-red-700" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="tel:+919876543210">Call Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
