import { IndustryMockInterview, Industry } from "./types";
import { BarChart } from "lucide-react"; // Lucide icon for Data Science

export const dataScience: Industry = {
  value: "dataScience",
  label: "Data Science",
  icon: BarChart,
  interviews: [
    {
      value: "ab_testing_basics",
      label: "A/B Testing Basics",
      purpose:
        "Assess the candidate’s understanding of A/B testing methodologies, including experiment design, hypothesis testing, and result interpretation.",
      description: "Understanding A/B testing methodologies",
    },
    {
      value: "machine_learning_101",
      label: "Machine Learning 101",
      purpose:
        "Evaluate the candidate’s foundational knowledge of machine learning concepts, algorithms, and their applications in solving real-world problems.",
      description: "Basic machine learning concepts",
    },
    {
      value: "big_data_concepts",
      label: "Big Data Concepts",
      purpose:
        "Discuss the key concepts in big data, including data storage, processing, and tools like Hadoop and Spark for managing large datasets.",
      description: "Big data storage and processing",
    },
    {
      value: "data_analysis_talk",
      label: "Data Analysis Talk",
      purpose:
        "Assess the candidate’s ability to analyze datasets, extract insights, and communicate findings in a clear and actionable manner.",
      description: "Data analysis and insights extraction",
    },
    {
      value: "sql_for_data_science",
      label: "SQL for Data Science",
      purpose:
        "Test the candidate’s proficiency in SQL for querying databases, manipulating data, and performing analytical tasks.",
      description: "Proficiency in SQL for data science",
    },
    {
      value: "data_cleaning_tips",
      label: "Data Cleaning Tips",
      purpose:
        "Evaluate the candidate’s approach to cleaning and preprocessing data, focusing on techniques for handling missing data, outliers, and data transformation.",
      description: "Data cleaning and preprocessing techniques",
    },
    {
      value: "deep_learning_intro",
      label: "Deep Learning Intro",
      purpose:
        "Explore the candidate’s understanding of deep learning concepts, including neural networks, backpropagation, and common frameworks like TensorFlow or PyTorch.",
      description: "Intro to deep learning concepts",
    },
    {
      value: "python_for_data_science",
      label: "Python for Data Science",
      purpose:
        "Assess the candidate’s proficiency in using Python for data manipulation, analysis, and building machine learning models.",
      description: "Proficiency in Python for data science",
    },
    {
      value: "statistics_basics",
      label: "Statistics Basics",
      purpose:
        "Review key statistical concepts and methods that are critical for data analysis, such as probability distributions, hypothesis testing, and regression.",
      description: "Basic statistical concepts and methods",
    },
    {
      value: "time_series_basics",
      label: "Time Series Basics",
      purpose:
        "Evaluate the candidate’s understanding of time series analysis, including techniques for forecasting and analyzing temporal data patterns.",
      description: "Intro to time series analysis",
    },
    {
      value: "nlp",
      label: "Natural Language Processing (NLP)",
      purpose:
        "Assess the candidate’s knowledge of NLP techniques, including text preprocessing, tokenization, and applications like sentiment analysis.",
      description: "Natural language processing techniques",
    },
    {
      value: "data_visualization",
      label: "Data Visualization",
      purpose:
        "Discuss best practices for visualizing data and creating effective visual representations using tools like Matplotlib, Seaborn, or Tableau.",
      description: "Data visualization best practices",
    },
    {
      value: "feature_engineering",
      label: "Feature Engineering",
      purpose:
        "Evaluate the candidate’s ability to engineer features that improve the performance of machine learning models, including handling categorical and numerical data.",
      description: "Feature engineering for machine learning",
    },
    {
      value: "clustering_dimensionality_reduction",
      label: "Clustering and Dimensionality Reduction",
      purpose:
        "Assess the candidate’s understanding of unsupervised learning techniques like K-Means and PCA for clustering and reducing the dimensionality of large datasets.",
      description: "Clustering and dimensionality reduction techniques",
    },
    {
      value: "data_ethics_privacy",
      label: "Data Ethics and Privacy",
      purpose:
        "Discuss the ethical considerations of working with data, including privacy concerns, bias in algorithms, and responsible AI practices.",
      description: "Ethical considerations in data",
    },
    {
      value: "data_pipelines_automation",
      label: "Data Pipelines and Automation",
      purpose:
        "Review the candidate’s experience in building scalable data pipelines for automated data processing and analysis.",
      description: "Building scalable data pipelines",
    },
    {
      value: "anomaly_detection",
      label: "Anomaly Detection",
      purpose:
        "Explore techniques for identifying outliers or anomalies in datasets, with applications in fraud detection, network security, and manufacturing.",
      description: "Outlier and anomaly detection techniques",
    },
    {
      value: "model_evaluation_tuning",
      label: "Model Evaluation and Tuning",
      purpose:
        "Assess the candidate’s ability to evaluate and tune machine learning models using metrics like accuracy, precision, recall, and cross-validation.",
      description: "Evaluating and tuning ML models",
    },
  ],
};
