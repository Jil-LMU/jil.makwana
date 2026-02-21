
import ExperienceImg from "./assets/PD1G.jpg";
import EducationImg1 from "./P2.jpg";
import EducationImg2 from "./P1.jpeg";

export const projects = [
    {
        id: 1,
        title: "Survival Analysis of Openieng new Restaurant in Los Angeles",
        description: "The restaurant industry is highly competitive, with a high failure rate for new establishments. Understanding the factors that contribute to restaurant success or failure is crucial for entrepreneurs looking to enter the market.",
        category: "Data Science",
        image: ExperienceImg, // Placeholder
        tags: ["Python", "R", "ML Models", "Survival Analysis", "Pandas", "Numpy", "Matplotlib", "Seaborn", "Scikit-learn", "Statsmodels", "Jupyter Notebook"],
        year: "2024",
        role: "Data Scientist",
        highlight: "Built modular charts, smooth transitions, and real-time filtering for large datasets.",
        demo: "#",
        repo: "#",
        problem: "The restaurant industry is highly competitive, with a high failure rate for new establishments. Understanding the factors that contribute to restaurant success or failure is crucial for entrepreneurs looking to enter the market.",
        approach: "I used survival analysis techniques to model the time until restaurant failure. I collected data on restaurant characteristics, location, and operating conditions to build a comprehensive dataset. I then used Cox proportional hazards models to identify the factors that influence restaurant survival.",
        solution: "Crime Rate Prediction and Zipcode matters when it comes to opening a new restaurant. I built a model to predict the crime rate in a given zipcode and used it to identify the best locations for opening a new restaurant.",
        impact: "I built a model to predict the crime rate in a given zipcode and used it to identify the best locations for opening a new restaurant. The model was able to predict the crime rate with 80% accuracy.",
        keyVariables: [
            {
                title: "Crime Rate",
                sub: "Strongest Risk Factor",
                description: "Higher crime is associated with a much higher chance of business failure.",
                hazardRatio: "12.7",
                insight: "Most dominant factor.",
                type: "risk",
            },
            {
                title: "Total Restaurants",
                sub: "Competition Pressure",
                description: "Areas with more restaurants tend to have higher failure risk.",
                hazardRatio: "3.8",
                insight: "Strong positive risk factor.",
                type: "risk",
            },
            {
                title: "Average Income",
                sub: "Protective but Smaller Effect",
                description: "Higher neighborhood income is linked to a small reduction in failure risk.",
                hazardRatio: "0.94",
                insight: "Modest protective effect.",
                type: "protective",
            }
        ]
    },

];

export const educationData = [
    {
        university: "Loyola Marymount University",
        degree: "Master's in Computer Science",
        year: "2024 - 2026",
        location: "Los Angeles, CA",
        image: EducationImg1, // Placeholder
    },
    {
        university: "Gujarat Technological University",
        degree: "Bachelor's in Information Technology",
        year: "2020 - 2024",
        location: "Gujarat, India",
        image: EducationImg2, // Placeholder
    },
];

export const experienceData = [
    {
        role: "IOS Software Developer Intern",
        company: "ZenZiee",
        period: "November 2025 – Present",
        responsibilities: [
            "Developed and maintained iOS applications using Swift and SwiftUI.",
            "Collaborated with cross-functional teams to deliver high-quality mobile applications.",
            "Participated in code reviews and contributed to improving code quality and best practices.",
        ],
    },
    {
        role: "Graduate V/R Research Lab Assistant",
        company: "Loyola Marymount University",
        period: "November 2024 – July 2025",
        responsibilities: [
            "Assisted faculty and students with VR/AR research projects.",
            "Maintained and troubleshot VR/AR equipment and software.",
            "Supported data collection and analysis for research studies.",
        ],
    },
    {
        role: "Graduate Teaching Assistant",
        company: "Loyola Marymount University",
        period: "August 2024 – Present",
        responsibilities: [
            "Assisted faculty and students with course materials and assignments.",
            "Graded assignments and provided feedback to students.",
            "Supported data collection and analysis for research studies.",
        ],
    },
];
