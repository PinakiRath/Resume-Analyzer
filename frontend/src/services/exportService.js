import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Function to generate PDF report for analysis results
export const generateAnalysisReport = (resumeData, analysisData) => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(22);
  doc.setTextColor(99, 102, 241); // Primary color
  doc.text('Resume Analysis Report', 105, 20, null, null, 'center');

  // Add subtitle
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255); // White
  doc.text(`Analysis Date: ${new Date().toLocaleDateString()}`, 20, 30);
  doc.text(`Resume: ${resumeData.fileName}`, 20, 35);
  doc.text(`Job Role: ${analysisData.jobRole}`, 20, 40);

  // Add ATS Score
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text('ATS Score', 20, 55);
  
  // Draw score circle
  const score = analysisData.atsScore;
  doc.setDrawColor(99, 102, 241);
  doc.setFillColor(255, 255, 255);
  doc.circle(45, 75, 20);
  doc.setFontSize(20);
  doc.setTextColor(99, 102, 241);
  doc.text(`${score}%`, 45, 78, null, null, 'center');

  // Add score description
  doc.setFontSize(12);
  doc.setTextColor(229, 231, 235); // Light gray
  let scoreDescription = '';
  if (score >= 80) {
    scoreDescription = 'Excellent - Highly ATS Compatible';
    doc.setTextColor(34, 197, 94); // Green
  } else if (score >= 60) {
    scoreDescription = 'Good - Moderately ATS Compatible';
    doc.setTextColor(250, 204, 21); // Yellow
  } else {
    scoreDescription = 'Needs Improvement - Low ATS Compatibility';
    doc.setTextColor(239, 68, 68); // Red
  }
  doc.text(scoreDescription, 20, 85);

  // Add Job Role Match
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text('Job Role Match', 120, 55);
  doc.setFontSize(20);
  doc.setTextColor(99, 102, 241);
  doc.text(`${analysisData.matchPercentage}%`, 120, 70);

  // Add skills found
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('Skills Found', 20, 100);
  doc.setFontSize(10);
  doc.setTextColor(229, 231, 235);
  
  const skillsFound = analysisData.skillsFound || [];
  let yPos = 105;
  for (let i = 0; i < Math.min(skillsFound.length, 10); i++) {
    doc.text(`• ${skillsFound[i]}`, 25, yPos);
    yPos += 5;
    if (yPos > 180) {
      doc.addPage();
      yPos = 20;
    }
  }

  if (skillsFound.length > 10) {
    doc.text(`... and ${skillsFound.length - 10} more`, 25, yPos);
    yPos += 10;
  }

  // Add skills missing
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('Skills Missing', 120, 100);
  doc.setFontSize(10);
  doc.setTextColor(229, 231, 235);
  
  const skillsMissing = analysisData.skillsMissing || [];
  let yPosRight = 105;
  for (let i = 0; i < Math.min(skillsMissing.length, 10); i++) {
    doc.text(`• ${skillsMissing[i]}`, 125, yPosRight);
    yPosRight += 5;
    if (yPosRight > 180) {
      doc.addPage();
      yPosRight = 20;
    }
  }

  if (skillsMissing.length > 10) {
    doc.text(`... and ${skillsMissing.length - 10} more`, 125, yPosRight);
    yPosRight += 10;
  }

  // Add AI Feedback if available
  if (analysisData.aiFeedback) {
    doc.addPage();
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.text('AI-Powered Suggestions', 20, 20);
    doc.setFontSize(10);
    doc.setTextColor(229, 231, 235);

    // Add feedback text with automatic line breaks
    const splitFeedback = doc.splitTextToSize(analysisData.aiFeedback, 170);
    let feedbackYPos = 30;
    for (let i = 0; i < splitFeedback.length; i++) {
      if (feedbackYPos > 270) {
        doc.addPage();
        feedbackYPos = 20;
      }
      doc.text(splitFeedback[i], 20, feedbackYPos);
      feedbackYPos += 6;
    }
  }

  // Add sections analysis
  doc.addPage();
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text('Resume Sections Analysis', 20, 20);

  // Create a table for sections
  doc.autoTable({
    startY: 30,
    head: [['Section', 'Status']],
    body: [
      ['Summary', analysisData.sections?.summary ? '✓ Present' : '✗ Missing'],
      ['Experience', analysisData.sections?.experience ? '✓ Present' : '✗ Missing'],
      ['Education', analysisData.sections?.education ? '✓ Present' : '✗ Missing'],
      ['Skills', analysisData.sections?.skills ? '✓ Present' : '✗ Missing'],
      ['Contact Info', analysisData.sections?.contact ? '✓ Present' : '✗ Missing'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [99, 102, 241] }, // Primary color
    styles: { 
      textColor: [229, 231, 235], // Light gray text
      fillColor: [31, 41, 55] // Dark background
    },
    alternateRowStyles: { 
      fillColor: [17, 24, 39] // Slightly lighter dark background
    }
  });

  // Save the PDF
  doc.save(`resume-analysis-report-${resumeData._id}.pdf`);
};

// Function to export as JSON
export const exportAsJSON = (resumeData, analysisData) => {
  const exportData = {
    resume: {
      fileName: resumeData.fileName,
      jobRole: resumeData.jobRole,
      uploadDate: resumeData.createdAt,
      fileSize: resumeData.fileSize
    },
    analysis: {
      atsScore: analysisData.atsScore,
      matchPercentage: analysisData.matchPercentage,
      skillsFound: analysisData.skillsFound,
      skillsMissing: analysisData.skillsMissing,
      sections: analysisData.sections,
      aiFeedback: analysisData.aiFeedback,
      improvementSuggestions: analysisData.improvementSuggestions,
      keywordDensity: analysisData.keywordDensity,
      overallScore: analysisData.overallScore
    },
    exportDate: new Date().toISOString()
  };

  const dataStr = JSON.stringify(exportData, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = `resume-analysis-${resumeData._id}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};