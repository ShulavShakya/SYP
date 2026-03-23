import React from "react";
import {
  Plus,
  HeartHandshake,
  ShieldCheck,
  Users,
  Stethoscope,
  Building2,
  Award,
  Activity,
  Globe,
  Mail,
  ArrowRight,
  CheckCircle2,
  HeartPulse,
  Clock3,
  BadgeCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const styles = {
  cardShadow: { boxShadow: "0 4px 20px -2px rgba(0, 137, 123, 0.08)" },
  heroImageContainer: { borderRadius: 40, overflow: "hidden" },
};

export default function AboutUsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F1F8F7] font-sans text-[#263238]">
      <header className="border-b border-teal-50 bg-white">
        <nav className="container mx-auto flex items-center justify-between px-6 py-4">
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => navigate("/")}
          >
            <div className="rounded-md bg-[#00897B] p-1.5">
              <Plus className="h-6 w-6 text-white" strokeWidth={3} />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#263238]">
              Upachaar
            </span>
          </div>

          <div className="hidden items-center space-x-8 text-sm font-medium text-slate-600 md:flex">
            <button
              className="transition hover:cursor-pointer hover:text-[#00897B]"
              onClick={() => navigate("/")}
            >
              Home
            </button>
            <button
              className="transition hover:cursor-pointer hover:text-[#00897B]"
              onClick={() => navigate("/about")}
            >
              About Us
            </button>
            <button className="transition hover:text-[#00897B]">
              Departments
            </button>
            <button className="transition hover:text-[#00897B]">Contact</button>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="rounded-lg px-4 py-2 text-sm font-semibold text-[#00897B] transition hover:cursor-pointer hover:bg-teal-50"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="rounded-lg bg-[#00897B] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:cursor-pointer hover:bg-teal-700"
              onClick={() => navigate("/patient/signup")}
            >
              Get Started
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section className="container mx-auto flex flex-col items-center gap-12 px-6 pb-24 pt-16 lg:flex-row">
          <div className="space-y-8 lg:w-1/2">
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#00897B]">
              <HeartPulse className="h-3.5 w-3.5" />
              About Upachaar
            </div>

            <h1 className="text-5xl font-extrabold leading-tight text-[#263238] lg:text-6xl xl:text-7xl">
              Caring for People, Powered by{" "}
              <span className="text-[#00897B]">Purpose</span>
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
              Upachaar is a modern hospital management and patient care platform
              built to connect compassionate healthcare with smarter digital
              workflows. We help hospitals, staff, and patients work together
              more efficiently, securely, and confidently.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                className="rounded-xl bg-[#00897B] px-8 py-4 font-bold text-white shadow-lg transition hover:cursor-pointer hover:bg-teal-700"
                onClick={() => navigate("/patient/signup")}
              >
                Join Upachaar
              </button>
              <button
                className="rounded-xl border border-slate-200 bg-white px-8 py-4 font-bold text-[#263238] shadow-sm transition hover:cursor-pointer hover:bg-slate-50"
                onClick={() => navigate("/login")}
              >
                Explore Portal
              </button>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div
              className="bg-white p-4 shadow-2xl"
              style={styles.heroImageContainer}
            >
              <img
                alt="Healthcare team collaboration"
                className="h-full w-full rounded-[32px] object-cover"
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"
              />
            </div>
          </div>
        </section>

        <section className="bg-white py-24">
          <div className="container mx-auto px-6">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-[#263238]">
                Our Mission, Vision, and Values
              </h2>
              <p className="text-slate-500">
                Everything we build is centered around patient trust, clinical
                excellence, and operational simplicity.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <InfoCard
                icon={<HeartHandshake className="h-6 w-6" />}
                title="Our Mission"
                description="To improve healthcare delivery by making hospital operations more connected, efficient, and patient-centered."
              />
              <InfoCard
                icon={<Globe className="h-6 w-6" />}
                title="Our Vision"
                description="To become a trusted digital healthcare platform that empowers providers and improves patient experiences everywhere."
              />
              <InfoCard
                icon={<ShieldCheck className="h-6 w-6" />}
                title="Our Values"
                description="Compassion, integrity, innovation, accountability, and a deep commitment to privacy, safety, and quality care."
              />
            </div>
          </div>
        </section>

        <section className="bg-[#F1F8F7] py-24">
          <div className="container mx-auto grid items-center gap-16 px-6 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-4xl font-extrabold text-[#263238]">
                Why Upachaar Exists
              </h2>
              <p className="mb-8 leading-relaxed text-slate-600">
                Healthcare teams deserve systems that reduce friction, not add
                to it. Upachaar was created to simplify hospital workflows such
                as patient registration, appointments, medical records, staff
                coordination, and day-to-day administration.
              </p>

              <div className="space-y-4">
                {[
                  "Centralized patient and hospital information",
                  "Faster workflows for staff and administrators",
                  "Secure and organized access to medical records",
                  "Better communication across departments",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-[#00897B]/10 p-1 text-[#00897B]">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <p className="font-medium text-[#263238]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <StatCard
                number="50+"
                label="Healthcare professionals supported"
              />
              <StatCard
                number="24/7"
                label="System accessibility and support"
              />
              <StatCard
                number="100%"
                label="Focus on patient-first workflows"
              />
              <StatCard
                number="1"
                label="Unified hospital management experience"
              />
            </div>
          </div>
        </section>

        <section className="bg-white py-24">
          <div className="container mx-auto px-6">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-[#263238]">
                What Makes Us Different
              </h2>
              <p className="text-slate-500">
                A healthcare platform should support both clinical excellence
                and operational clarity.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<Users className="h-7 w-7" />}
                title="Patient-Centered"
                description="Designed to create smoother patient journeys from registration to follow-up care."
              />
              <FeatureCard
                icon={<Stethoscope className="h-7 w-7" />}
                title="Clinical Ready"
                description="Built to support doctors, nurses, and staff with intuitive workflows."
              />
              <FeatureCard
                icon={<Building2 className="h-7 w-7" />}
                title="Hospital Friendly"
                description="Helps administration teams coordinate operations more efficiently."
              />
              <FeatureCard
                icon={<BadgeCheck className="h-7 w-7" />}
                title="Secure by Design"
                description="Focused on privacy, secure data handling, and trusted access control."
              />
            </div>
          </div>
        </section>

        <section className="bg-[#F1F8F7] py-24">
          <div className="container mx-auto px-6">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-[#263238]">
                Our Commitments
              </h2>
              <p className="text-slate-500">
                We are committed to building a system healthcare organizations
                can rely on every day.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <CommitmentCard
                icon={<Activity className="h-6 w-6" />}
                title="Reliable Operations"
                description="We aim to support day-to-day hospital processes with consistency and clarity."
              />
              <CommitmentCard
                icon={<Clock3 className="h-6 w-6" />}
                title="Faster Access"
                description="We reduce delays in accessing critical patient and operational information."
              />
              <CommitmentCard
                icon={<Award className="h-6 w-6" />}
                title="Continuous Improvement"
                description="We keep improving the platform based on real healthcare workflow needs."
              />
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-24">
          <div className="relative overflow-hidden rounded-[40px] bg-[#00897B] p-12 text-center text-white shadow-2xl lg:p-24">
            <div className="absolute inset-0 bg-white/5 opacity-10" />
            <div className="relative z-10 mx-auto max-w-3xl space-y-8">
              <h2 className="text-4xl font-extrabold leading-tight lg:text-5xl">
                Building Better Healthcare Experiences
              </h2>
              <p className="text-xl font-light text-teal-50">
                Whether you are a patient, doctor, receptionist, or hospital
                administrator, Upachaar is here to make care more connected and
                efficient.
              </p>
              <div className="flex flex-wrap justify-center gap-6 pt-4">
                <button
                  className="rounded-xl border-2 border-white/40 bg-transparent px-10 py-4 font-bold text-white transition hover:cursor-pointer hover:bg-white/10"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="rounded-xl bg-white px-10 py-4 font-extrabold text-[#00897B] shadow-xl transition hover:cursor-pointer hover:bg-teal-50"
                  onClick={() => navigate("/patient/signup")}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-100 bg-white pb-8 pt-20">
        <div className="container mx-auto px-6">
          <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-6 lg:col-span-2">
              <div className="flex items-center gap-2">
                <div className="rounded-md bg-[#00897B] p-1.5">
                  <Plus className="h-6 w-6 text-white" strokeWidth={3} />
                </div>
                <span className="text-xl font-bold tracking-tight text-[#263238]">
                  Upachaar
                </span>
              </div>

              <p className="max-w-sm text-sm leading-relaxed text-slate-400">
                Upachaar is dedicated to modernizing healthcare experiences with
                patient-centered design, secure systems, and streamlined
                hospital operations.
              </p>

              <div className="flex gap-4">
                <SocialIcon
                  href="#"
                  label="Website"
                  icon={<Globe className="h-5 w-5" />}
                />
                <SocialIcon
                  href="#"
                  label="Email"
                  icon={<Mail className="h-5 w-5" />}
                />
              </div>
            </div>

            <FooterCol
              title="Company"
              links={["About Us", "Our Mission", "Careers", "Contact"]}
            />
            <FooterCol
              title="Platform"
              links={[
                "Patient Portal",
                "Hospital Access",
                "Security",
                "Support",
              ]}
            />
            <FooterCol
              title="Legal"
              links={[
                "Privacy Policy",
                "Terms of Service",
                "Security",
                "Compliance",
              ]}
            />
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 text-xs text-slate-400 md:flex-row">
            <p>© 2026 Upachaar. All rights reserved.</p>
            <div className="flex gap-6">
              <a className="transition hover:text-[#263238]" href="#">
                Cookie Settings
              </a>
              <a className="transition hover:text-[#263238]" href="#">
                Sitemap
              </a>
              <a className="transition hover:text-[#263238]" href="#">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function InfoCard({ icon, title, description }) {
  return (
    <div
      className="rounded-2xl border border-teal-50 bg-[#F9FBFA] p-8"
      style={styles.cardShadow}
    >
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 text-[#00897B]">
        {icon}
      </div>
      <h3 className="mb-3 text-xl font-bold">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-600">{description}</p>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-[#00897B]">
        {icon}
      </div>
      <h3 className="mb-3 text-xl font-bold">{title}</h3>
      <p className="text-sm text-slate-500">{description}</p>
    </div>
  );
}

function CommitmentCard({ icon, title, description }) {
  return (
    <div
      className="rounded-2xl border border-teal-50 bg-white p-8"
      style={styles.cardShadow}
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 text-[#00897B]">
        {icon}
      </div>
      <h3 className="mb-3 text-xl font-bold text-[#263238]">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-600">{description}</p>
    </div>
  );
}

function StatCard({ number, label }) {
  return (
    <div
      className="rounded-2xl border border-teal-50 bg-white p-8"
      style={styles.cardShadow}
    >
      <div className="mb-2 flex items-center gap-2 text-[#00897B]">
        <ArrowRight className="h-5 w-5" />
        <span className="text-3xl font-extrabold">{number}</span>
      </div>
      <p className="text-sm font-medium text-slate-500">{label}</p>
    </div>
  );
}

function FooterCol({ title, links }) {
  return (
    <div className="space-y-6">
      <h5 className="text-xs font-bold uppercase tracking-widest text-[#263238]">
        {title}
      </h5>
      <ul className="space-y-4 text-sm text-slate-500">
        {links.map((t) => (
          <li key={t}>
            <a className="transition hover:text-[#00897B]" href="#">
              {t}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ href, icon, label }) {
  return (
    <a
      className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition hover:border-[#00897B] hover:text-[#00897B]"
      href={href}
      aria-label={label}
      title={label}
    >
      {icon}
    </a>
  );
}
