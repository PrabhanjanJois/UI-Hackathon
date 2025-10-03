import React from "react";
import {
  Code,
  Cloud,
  Users,
  Lightbulb,
  Shield,
  Database,
  GitBranch,
  Wrench,
  Server,
  Cpu,
  HardDrive,
  Network,
  Lock,
  UserCheck,
  FileSearch,
  BarChart3,
  LineChart,
  PieChart,
  Container,
  Boxes,
  Settings,
} from "lucide-react";

export const menuData = {
  main: {
    title: "Services",
    items: [
      {
        icon: Code,
        title: "Software Solutions",
        description: "Custom software development and deployment",
        hasSubmenu: true,
        submenu: "software",
      },
      {
        icon: Database,
        title: "Data & Analytics Consulting",
        description: "Data strategy, analytics, and business intelligence",
        hasSubmenu: true,
        submenu: "analytics",
      },

      {
        icon: Users,
        title: "Consulting Services",
        description: "Expert guidance and strategic support",
        hasSubmenu: false,
      },
      {
        icon: Lightbulb,
        title: "Digital Transformation",
        description: "Comprehensive digital transformation strategies",
        hasSubmenu: false,
      },
      {
        icon: Shield,
        title: "Cybersecurity Consulting",
        description: "Comprehensive cybersecurity services and solutions",
        hasSubmenu: true,
        submenu: "cybersecurity",
      },
      {
        icon: Cloud,
        title: "Cloud Services",
        description: "Scalable cloud solutions and infrastructure",
        hasSubmenu: true,
        submenu: "cloud",
      },
      {
        icon: GitBranch,
        title: "DevOps & Platform Engineering",
        description: "DevOps transformation and platform engineering",
        hasSubmenu: true,
        submenu: "devops",
      },
      {
        icon: Wrench,
        title: "Support & Maintenance",
        description: "Ongoing maintenance and support services",
        hasSubmenu: false,
      },
    ],
  },
  software: {
    title: "Software Solutions",
    items: [
      {
        icon: Code,
        title: "Web Development",
        description: "Modern web applications and platforms",
        hasSubmenu: true,
        submenu: "webdev",
      },
      {
        icon: Cpu,
        title: "Mobile Applications",
        description: "iOS and Android app development",
        hasSubmenu: false,
      },
      {
        icon: Server,
        title: "Enterprise Software",
        description: "Large-scale business solutions",
        hasSubmenu: false,
      },
      {
        icon: Settings,
        title: "Custom Solutions",
        description: "Tailored software for specific needs",
        hasSubmenu: false,
      },
    ],
  },
  webdev: {
    title: "Web Development",
    items: [
      {
        icon: Code,
        title: "Frontend Development",
        description: "React, Vue, Angular applications",
        hasSubmenu: false,
      },
      {
        icon: Server,
        title: "Backend Development",
        description: "Node.js, Python, Java services",
        hasSubmenu: false,
      },
      {
        icon: Database,
        title: "Full Stack Solutions",
        description: "End-to-end web development",
        hasSubmenu: false,
      },
    ],
  },
  cloud: {
    title: "Cloud Services",
    items: [
      {
        icon: Server,
        title: "Cloud Migration",
        description: "Seamless transition to cloud platforms",
        hasSubmenu: false,
      },
      {
        icon: Network,
        title: "Infrastructure Setup",
        description: "AWS, Azure, GCP configuration",
        hasSubmenu: true,
        submenu: "infrastructure",
      },
      {
        icon: HardDrive,
        title: "Storage Solutions",
        description: "Scalable data storage systems",
        hasSubmenu: false,
      },
      {
        icon: Boxes,
        title: "Containerization",
        description: "Docker and Kubernetes deployment",
        hasSubmenu: false,
      },
    ],
  },
  infrastructure: {
    title: "Infrastructure Setup",
    items: [
      {
        icon: Cloud,
        title: "AWS Services",
        description: "Amazon Web Services configuration",
        hasSubmenu: false,
      },
      {
        icon: Cloud,
        title: "Azure Platform",
        description: "Microsoft Azure setup",
        hasSubmenu: false,
      },
      {
        icon: Cloud,
        title: "Google Cloud",
        description: "GCP infrastructure management",
        hasSubmenu: false,
      },
    ],
  },
  cybersecurity: {
    title: "Cybersecurity Consulting",
    items: [
      {
        icon: Lock,
        title: "Security Audits",
        description: "Comprehensive security assessments",
        hasSubmenu: false,
      },
      {
        icon: Shield,
        title: "Penetration Testing",
        description: "Identify vulnerabilities proactively",
        hasSubmenu: false,
      },
      {
        icon: UserCheck,
        title: "Compliance & Governance",
        description: "Regulatory compliance solutions",
        hasSubmenu: false,
      },
      {
        icon: FileSearch,
        title: "Threat Intelligence",
        description: "Real-time threat monitoring",
        hasSubmenu: false,
      },
    ],
  },
  analytics: {
    title: "Data & Analytics",
    items: [
      {
        icon: BarChart3,
        title: "Business Intelligence",
        description: "Data-driven insights and reporting",
        hasSubmenu: false,
      },
      {
        icon: LineChart,
        title: "Predictive Analytics",
        description: "Machine learning models",
        hasSubmenu: false,
      },
      {
        icon: PieChart,
        title: "Data Visualization",
        description: "Interactive dashboards",
        hasSubmenu: false,
      },
      {
        icon: Database,
        title: "Data Engineering",
        description: "ETL and data pipeline setup",
        hasSubmenu: false,
      },
    ],
  },
  devops: {
    title: "DevOps & Platform",
    items: [
      {
        icon: GitBranch,
        title: "CI/CD Pipeline",
        description: "Automated deployment workflows",
        hasSubmenu: false,
      },
      {
        icon: Container,
        title: "Container Orchestration",
        description: "Kubernetes and Docker Swarm",
        hasSubmenu: false,
      },
      {
        icon: Settings,
        title: "Infrastructure as Code",
        description: "Terraform and Ansible automation",
        hasSubmenu: false,
      },
      {
        icon: Server,
        title: "Monitoring & Logging",
        description: "System observability solutions",
        hasSubmenu: false,
      },
    ],
  },
};
