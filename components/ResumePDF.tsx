import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Modern Styles for Premium PDF
const styles = StyleSheet.create({
  page: { 
    padding: "40 50", 
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica' 
  },
  // Header Section
  header: {
    marginBottom: 25,
    borderBottomWidth: 2,
    borderBottomColor: '#1d4ed8',
    paddingBottom: 15,
  },
  name: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#111827',
    letterSpacing: 0.5,
    marginBottom: 6
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 9,
    color: '#4b5563',
    gap: 12,
  },
  // Section Styling
  section: { 
    marginBottom: 20 
  },
  sectionTitle: { 
    fontSize: 11, 
    fontWeight: 'bold', 
    color: '#1d4ed8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
    backgroundColor: '#f3f4f6',
    padding: "4 8",
    borderRadius: 2
  },
  // Content Text
  text: { 
    fontSize: 10, 
    lineHeight: 1.6, 
    color: '#374151',
    textAlign: 'justify'
  },
  // Professional Entries (Exp/Edu)
  entryContainer: {
    marginBottom: 12,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2
  },
  entryTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827'
  },
  entryDate: {
    fontSize: 9,
    color: '#6b7280',
  },
  entrySub: {
    fontSize: 10,
    color: '#1d4ed8',
    marginBottom: 4,
    fontStyle: 'italic'
  },
  // List/Bullet Points
  bulletContainer: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingLeft: 5
  },
  bullet: {
    width: 12,
    fontSize: 10,
    color: '#1d4ed8'
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    lineHeight: 1.4,
    color: '#4b5563'
  },
  // Skills Badge Layout
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 2
  },
  skillBadge: {
    fontSize: 9,
    color: '#1f2937',
    backgroundColor: '#e5e7eb',
    padding: "3 8",
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d1d5db'
  }
});

// Full Interface
interface ResumeData {
  name: string;
  email: string;
  phone?: string;
  github?: string;
  address?: string;
  objective: string;
  skills: string[];
  education?: { 
    degree: string; 
    college: string; 
    year: string; 
    score: string 
  }[];
  experience?: { 
    role: string; 
    company: string; 
    duration: string; 
    points: string[] 
  }[];
  certifications?: string[];
}

// Full Updated Component
export const ResumePDF = ({ data }: { data: ResumeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* 1. Header Section */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.name || 'Full Name'}</Text>
        <View style={styles.contactRow}>
          <Text>{data.email}</Text>
          {data.phone && <Text>•  {data.phone}</Text>}
          {data.github && <Text>•  GitHub: {data.github}</Text>}
          {data.address && <Text>•  {data.address}</Text>}
        </View>
      </View>
      
      {/* 2. Professional Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text style={styles.text}>{data.objective || 'AI generated objective goes here...'}</Text>
      </View>

      {/* 3. Technical Expertise (Badge Style) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Technical Expertise</Text>
        <View style={styles.skillsContainer}>
          {data.skills?.map((skill, i) => (
            <Text key={i} style={styles.skillBadge}>{skill}</Text>
          ))}
        </View>
      </View>

      {/* 4. Professional Experience */}
      {data.experience && data.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {data.experience.map((job, index) => (
            <View key={index} style={styles.entryContainer}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>{job.role}</Text>
                <Text style={styles.entryDate}>{job.duration}</Text>
              </View>
              <Text style={styles.entrySub}>{job.company}</Text>
              {job.points.map((p, i) => (
                <View key={i} style={styles.bulletContainer}>
                  <Text style={styles.bullet}>▹</Text>
                  <Text style={styles.bulletText}>{p}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}

      {/* 5. Education */}
      {data.education && data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={styles.entryContainer}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>{edu.degree}</Text>
                <Text style={styles.entryDate}>{edu.year}</Text>
              </View>
              <Text style={styles.entrySub}>{edu.college}  |  Score: {edu.score}</Text>
            </View>
          ))}
        </View>
      )}

      {/* 6. Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certifications & Awards</Text>
          {data.certifications.map((cert, i) => (
            <View key={i} style={styles.bulletContainer}>
              <Text style={styles.bullet}>▹</Text>
              <Text style={styles.bulletText}>{cert}</Text>
            </View>
          ))}
        </View>
      )}

    </Page>
  </Document>
);