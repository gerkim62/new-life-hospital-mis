import { formatDate, formatTime } from "@/lib/format";
import { Document, Page, Text, View } from "@react-pdf/renderer";

export type MedicalReportProps = {
  hospital?: {
    name: string;
    address: string;
    phone: string;
  };
  patient: {
    name: string;
    id: number;
    arrivalTime: Date;
    printedTime: Date;
  };
  labs: {
    name: string;
    description: string | null;
    result: string | null;
    comment: string | null;
  }[];
  medications: {
    name: string;
    description: string | null;
    fromStock: boolean;
    dosage: string;
  }[];
  symptoms: string | null;
  diagnosis: string | null;
  treatment: string | null;
  notes: string | null;
};

const styles = {
  page: {
    padding: 20,
    fontSize: 12,
    backgroundColor: "#FFFFFF",
    color: "#111827",
  },
  header: {
    marginBottom: 16,
    textAlign: "center",
    borderBottom: "1px solid #E5E7EB",
    paddingBottom: 12,
  },
  hospitalName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#1F2937",
  },
  hospitalInfo: {
    fontSize: 12,
    color: "#4B5563",
  },
  titleBox: {
    textAlign: "center",
    marginBottom: 16,
    border: "2px solid #1F2937",
    padding: "6 16",
    alignSelf: "center",
    borderRadius: 4,
    backgroundColor: "#F9FAFB",
  },
  titleText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1F2937",
  },
  referenceSection: {
    marginBottom: 12,
    fontSize: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F9FAFB",
    padding: 8,
    borderRadius: 4,
  },
  infoGrid: {
    flexDirection: "row",
    marginBottom: 16,
    borderRadius: 4,
    border: "1px solid #E5E7EB",
  },
  infoColumn: {
    flex: 1,
    padding: 8,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: "bold",
    backgroundColor: "#F3F4F6",
    padding: "6 8",
    marginBottom: 8,
    textTransform: "uppercase",
    borderRadius: 4,
    color: "#1F2937",
  },
  contentPadding: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  table: {
    width: "100%",
    marginTop: 6,
    border: "1px solid #E5E7EB",
    borderRadius: 4,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderBottomWidth: 1,
    borderColor: "#D1D5DB",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    minHeight: 30,
  },
  tableCell: {
    flex: 1,
    padding: 6,
    borderRightWidth: 1,
    borderColor: "#E5E7EB",
  },
  tableCellHeader: {
    fontWeight: "bold",
    color: "#1F2937",
  },
  medicationStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginRight: 4,
  },
  statusTextDispensed: {
    color: "#065F46",
  },
  statusTextExternal: {
    color: "#854D0E",
  },
  footer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    fontSize: 10,
    color: "#6B7280",
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
    color: "#1F2937",
  },
  smallText: {
    fontSize: 10,
  },
  grayText: {
    color: "#4B5563",
  },
  clinicalSection: {
    border: "1px solid #E5E7EB",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  sectionContent: {
    border: "1px solid #E5E7EB",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  labsContainer: {
    border: "1px solid #E5E7EB",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  }
} as const;

const MedicalReportPdf = ({
  hospital = {
    name: "NewLife Medical Center",
    address: "Baraton",
    phone: "+254-769-994-005",
  },
  patient,
  labs,
  medications,
  symptoms,
  diagnosis,
  treatment,
  notes,
}: MedicalReportProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.hospitalName}>{hospital.name.toUpperCase()}</Text>
          <Text style={styles.hospitalInfo}>{hospital.address}</Text>
          <Text style={styles.hospitalInfo}>TEL: {hospital.phone}</Text>
        </View>

        <View style={styles.titleBox}>
          <Text style={styles.titleText}>MEDICAL REPORT</Text>
        </View>

        <View style={styles.referenceSection}>
          <View>
            <Text>
              <Text style={styles.bold}>Report No: </Text>
              MR-{patient.id.toString().padStart(6, "0")}
            </Text>
            <Text>
              <Text style={styles.bold}>Patient ID: </Text>
              {patient.id.toString().padStart(6, "0")}
            </Text>
          </View>
          <View>
            <Text>
              <Text style={styles.bold}>Date: </Text>
              {formatDate(patient.printedTime)}
            </Text>
            <Text>
              <Text style={styles.bold}>Time: </Text>
              {formatTime(patient.printedTime)}
            </Text>
          </View>
        </View>

        <View>
          <Text style={styles.sectionHeader}>Patient Information</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoColumn}>
              <View style={styles.contentPadding}>
                <Text>
                  <Text style={styles.bold}>Patient Name: </Text>
                  {patient.name}
                </Text>
                <Text>
                  <Text style={styles.bold}>Visit Date: </Text>
                  {formatDate(patient.arrivalTime)}
                </Text>
              </View>
            </View>
            <View style={styles.infoColumn}>
              <View style={styles.contentPadding}>
                <Text>
                  <Text style={styles.bold}>Registration No: </Text>
                  {patient.id}
                </Text>
                <Text>
                  <Text style={styles.bold}>Visit Time: </Text>
                  {formatTime(patient.arrivalTime)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.sectionHeader}>Clinical Assessment</Text>
          <View style={styles.clinicalSection}>
            <View style={{ marginBottom: 12 }}>
              <Text style={styles.bold}>Symptoms:</Text>
              <Text style={{ marginLeft: 8 }}>{symptoms}</Text>
            </View>
            <View style={{ marginBottom: 12 }}>
              <Text style={styles.bold}>Clinical Diagnosis:</Text>
              <Text style={{ marginLeft: 8 }}>{diagnosis}</Text>
            </View>
            <View style={{ marginBottom: 12 }}>
              <Text style={styles.bold}>Treatment:</Text>
              <Text style={{ marginLeft: 8 }}>{treatment}</Text>
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.sectionHeader}>Laboratory Findings</Text>
          <View style={styles.labsContainer}>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <View style={[styles.tableCell, styles.tableCellHeader]}>
                  <Text>Investigation</Text>
                </View>
                <View style={[styles.tableCell, styles.tableCellHeader]}>
                  <Text>Results</Text>
                </View>
                <View style={[styles.tableCell, styles.tableCellHeader]}>
                  <Text>Comment</Text>
                </View>
              </View>
              {labs.map((lab, index) => (
                <View key={index} style={styles.tableRow}>
                  <View style={styles.tableCell}>
                    <Text style={styles.bold}>{lab.name}</Text>
                    <Text style={[styles.smallText, styles.grayText]}>
                      {lab.description}
                    </Text>
                  </View>
                  <View style={[styles.tableCell, { fontFamily: "Courier" }]}>
                    <Text>{lab.result}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{lab.comment}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {medications.length > 0 && (
          <View style={{ marginTop: 16 }}>
            <Text style={styles.sectionHeader}>Medications</Text>
            <View style={styles.sectionContent}>
              <View style={styles.table}>
                <View style={styles.tableHeader}>
                  <View style={[styles.tableCell, styles.tableCellHeader]}>
                    <Text>Medication Name</Text>
                  </View>
                  <View style={[styles.tableCell, styles.tableCellHeader]}>
                    <Text>Dosage & Frequency</Text>
                  </View>
                  <View style={[styles.tableCell, styles.tableCellHeader]}>
                    <Text>Dispensing Status</Text>
                  </View>
                </View>
                {medications.map((med, index) => (
                  <View key={index} style={styles.tableRow}>
                    <View style={styles.tableCell}>
                      <Text style={styles.bold}>{med.name}</Text>
                      <Text style={[styles.smallText, styles.grayText]}>
                        {med.description}
                      </Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text style={styles.bold}>{med.dosage}</Text>
                    </View>
                    <View style={styles.tableCell}>
                      <View style={styles.medicationStatus}>
                        <View
                          style={[
                            styles.statusDot,
                            {
                              backgroundColor: med.fromStock
                                ? "#059669"
                                : "#D97706",
                            },
                          ]}
                        />
                        <Text
                          style={
                            med.fromStock
                              ? styles.statusTextDispensed
                              : styles.statusTextExternal
                          }
                        >
                          {med.fromStock
                            ? "Dispensed"
                            : "External Purchase Required"}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {notes && (
          <View style={{ marginTop: 16 }}>
            <Text style={styles.sectionHeader}>Clinical Notes & Follow-up</Text>
            <View style={[styles.contentPadding, styles.clinicalSection]}>
              <Text>{notes}</Text>
            </View>
          </View>
        )}

        <View style={styles.footer}>
          <Text>This is an official medical document of {hospital.name}</Text>
          <Text style={{ marginTop: 4 }}>
            Generated on {formatDate(patient.printedTime)} at{" "}
            {formatTime(patient.printedTime)}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default MedicalReportPdf;