import { formatCurrency, formatDateTime } from "@/lib/format";
import { Document, Page, Text, View } from "@react-pdf/renderer";

type ReceiptData = {
  hospital: {
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
  labs: { name: string; description?: string; price: number }[];
  medications: { name: string; description?: string; price: number }[];
  otherExpenses: { name: string; description?: string; price: number }[];
};

export type ReceiptProps = {
  hospital?: ReceiptData["hospital"];
  patient: ReceiptData["patient"];
  labs: ReceiptData["labs"];
  medications: ReceiptData["medications"];
  otherExpenses: ReceiptData["otherExpenses"];
};

const ReceiptPdf = ({
  labs,
  medications,
  otherExpenses,
  patient,
  hospital = {
    name: "New Life Medical Center",
    address: "Baraton",
    phone: "+2547 xxx xxx",
  },
}: ReceiptProps) => {
  const receiptData: ReceiptData = {
    hospital,
    patient,
    labs,
    medications,
    otherExpenses,
  } as const;

  const calculateTotal = () =>
    receiptData.labs
      .concat(receiptData.medications, receiptData.otherExpenses)
      .reduce((total, item) => total + item.price, 0);

  const styles = {
    // Receipt-like size: roughly 80mm wide (~227pt) and enough height for content.
    page: {
      fontSize: 10,
      padding: 10,
      lineHeight: 1.2,
      backgroundColor: "#fff",
    },
    header: {
      textAlign: "center",
      paddingBottom: 5,
      marginBottom: 5,
      borderBottomWidth: 0.5,
      borderBottomStyle: "dashed",
      borderBottomColor: "#000",
    },
    hospitalName: {
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 2,
    },
    hospitalDetails: {
      fontSize: 8,
      marginBottom: 1,
    },
    receiptInfo: {
      marginBottom: 5,
    },
    infoLine: {
      fontSize: 9,
      marginBottom: 2,
    },
    sectionHeader: {
      fontSize: 10,
      fontWeight: "bold",
      marginTop: 5,
      marginBottom: 2,
    },
    divider: {
      borderBottomWidth: 0.5,
      borderBottomStyle: "dashed",
      borderBottomColor: "#000",
      marginVertical: 3,
    },
    itemRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 2,
    },
    itemName: {
      fontSize: 9,
      width: "60%",
    },
    price: {
      textAlign: "right",
      width: "40%",
      fontSize: 9,
    },
    total: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 3,
      borderTopWidth: 0.5,
      borderTopStyle: "dashed",
      borderTopColor: "#000",
      marginTop: 5,
    },
    footer: {
      textAlign: "center",
      marginTop: 5,
      fontSize: 8,
    },
  } as const;

  return (
    <Document>
      <Page size={[227, 800]} style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.hospitalName}>{receiptData.hospital.name}</Text>
          <Text style={styles.hospitalDetails}>
            {receiptData.hospital.address}
          </Text>
          <Text style={styles.hospitalDetails}>
            {receiptData.hospital.phone}
          </Text>
        </View>

        {/* Patient Information */}
        <View style={styles.receiptInfo}>
          <Text style={styles.infoLine}>
            Patient: {receiptData.patient.name}
          </Text>
          <Text style={styles.infoLine}>Patient ID: {receiptData.patient.id}</Text>
          <Text style={styles.infoLine}>
            Arrival: {formatDateTime(receiptData.patient.arrivalTime)}
          </Text>
          <Text style={styles.infoLine}>
            Print Time: {formatDateTime(receiptData.patient.printedTime)}
          </Text>
        </View>

        {/* Sections for Labs, Medications, and Other Expenses */}
        {[
          { title: "Laboratory Tests", data: receiptData.labs },
          { title: "Medications", data: receiptData.medications },
          { title: "Other Expenses", data: receiptData.otherExpenses },
        ]
          .filter((section) => section.data.length > 0)
          .map((section, idx) => (
            <View key={idx}>
              <Text style={styles.sectionHeader}>{section.title}:</Text>
              <View style={styles.divider} />
              {section.data.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                  <View style={styles.itemName}>
                    <Text>{item.name}</Text>
                    {item.description && (
                      <Text style={{ fontSize: 7 }}>{item.description}</Text>
                    )}
                  </View>
                  <Text style={styles.price}>{formatCurrency(item.price)}</Text>
                </View>
              ))}
            </View>
          ))}

        {/* Total */}
        <View style={styles.total}>
          <Text style={{ fontSize: 10, fontWeight: "bold" }}>Total</Text>
          <Text style={{ fontSize: 10, fontWeight: "bold" }}>
            {formatCurrency(calculateTotal())}
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Thank you for your visit!</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ReceiptPdf;
