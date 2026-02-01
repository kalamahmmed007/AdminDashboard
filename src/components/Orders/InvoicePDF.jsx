// InvoicePDF.jsx
import React from "react";
import { PDFDownloadLink, Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import QRCode from "qrcode.react";

const styles = StyleSheet.create({
    page: { padding: 30, fontSize: 12 },
    header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
    logo: { width: 100, height: 50 },
    section: { marginBottom: 10 },
    tableRow: { flexDirection: "row", justifyContent: "space-between" },
    tableHeader: { fontWeight: "bold", marginBottom: 5 },
    total: { fontSize: 14, fontWeight: "bold", marginTop: 10 },
});

export const InvoiceDocument = ({ order, shop }) => (
    <Document>
        <Page style={styles.page}>
            <View style={styles.header}>
                <Image src={shop.logo} style={styles.logo} />
                <QRCode value={`https://yourshop.com/orders/${order._id}`} size={50} />
            </View>

            <Text style={{ fontSize: 16, marginBottom: 10 }}>Invoice #{order.orderNumber}</Text>
            <Text>Date: {new Date(order.createdAt).toLocaleDateString()}</Text>

            <View style={styles.section}>
                <Text style={styles.tableHeader}>Customer Info:</Text>
                <Text>{order.customer?.name}</Text>
                <Text>{order.customer?.email}</Text>
                <Text>{order.customer?.phone}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.tableHeader}>Items:</Text>
                {order.items.map((item, i) => (
                    <View key={i} style={styles.tableRow}>
                        <Text>{item.name} x {item.quantity}</Text>
                        <Text>${item.price * item.quantity}</Text>
                    </View>
                ))}
            </View>

            <Text style={styles.total}>Total: ${order.total}</Text>
        </Page>
    </Document>
);

// Usage
export default function InvoicePDF({ order, shop }) {
    return (
        <PDFDownloadLink
            document={<InvoiceDocument order={order} shop={shop} />}
            fileName={`Invoice-${order.orderNumber}.pdf`}
            style={{ padding: "10px 20px", backgroundColor: "#2563eb", color: "white", borderRadius: 5 }}
        >
            {({ loading }) => (loading ? "Preparing..." : "Download Invoice")}
        </PDFDownloadLink>
    );
}
