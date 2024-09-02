import React, { useState, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// Fetch data function
const fetchLogs = async (selectedIds) => {
  try {
    const response = await fetch(` http://localhost:5000/logs/los?ids=${selectedIds.join(',')}`, {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching logs:', error);
    return [];
  }
};

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontFamily: 'Garamond',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  table: {
    display: 'table',
    width: 'auto',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '10%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 8,
    textAlign: 'left',
  },
  wideColumn: {
    width: '30%',
  },
});

// Create Document Component
const MyDocument = ({ logs }) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.title}>AIRCRAFT MAINTENANCE ENGINEER'S WORK RECORD/LOGBOOK</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCol, { width: '7%' }]}>SL NO.</Text>
          <Text style={[styles.tableCol, { width: '10%' }]}>Date & Time</Text>
          <Text style={[styles.tableCol, { width: '10%' }]}>Type of Aircraft/Engine</Text>
          <Text style={[styles.tableCol, { width: '10%' }]}>Aircraft Reg.</Text>
          <Text style={[styles.tableCol, { width: '7%' }]}>ATA Chapter</Text>
          <Text style={[styles.tableCol, { width: '7%' }]}>Work Order No.</Text>
          <Text style={[styles.tableCol, styles.wideColumn]}>Maintenance Task</Text>
          <Text style={[styles.tableCol, { width: '7%' }]}>Type of Maintenance</Text>
          <Text style={[styles.tableCol, { width: '7%' }]}>Type of Activity</Text>
          <Text style={[styles.tableCol, { width: '7%' }]}>Category</Text>
          <Text style={[styles.tableCol, { width: '7%' }]}>Duration in Hrs./Days</Text>
          <Text style={[styles.tableCol, { width: '15%' }]}>Supervisor Name & Sign,AME Licence No</Text>
        </View>
        {logs.map((log, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableCol, { width: '7%' }]}>{log.Id}</Text>
            <Text style={[styles.tableCol, { width: '10%' }]}>{new Date(log.createdAt).toLocaleDateString()}</Text>
            <Text style={[styles.tableCol, { width: '10%' }]}>{log.ToA}</Text>
            <Text style={[styles.tableCol, { width: '10%' }]}>{log.Reg}</Text>
            <Text style={[styles.tableCol, { width: '7%' }]}>{log.ATA}</Text>
            <Text style={[styles.tableCol, { width: '7%' }]}>{log.Wo}</Text>
            <Text style={[styles.tableCol, styles.wideColumn]}>{log.Mt}</Text>
            <Text style={[styles.tableCol, { width: '7%' }]}>{log.TOM}</Text>
            <Text style={[styles.tableCol, { width: '7%' }]}>{log.TOA}</Text>
            <Text style={[styles.tableCol, { width: '7%' }]}>{log.C}</Text>
            <Text style={[styles.tableCol, { width: '7%' }]}>{log.DU}</Text>
            <Text style={[styles.tableCol, { width: '15%' }]}>{log.Supervisor}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const DocumentComponent = ({ selectedIds }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const getLogs = async () => {
      const fetchedLogs = await fetchLogs(selectedIds);
      setLogs(fetchedLogs);
    };

    if (selectedIds.length > 0) {
      getLogs();
    }
  }, [selectedIds]);

  return (
    <div>
      {logs.length > 0 ? (
        <PDFDownloadLink document={<MyDocument logs={logs} />} fileName="GMRLogBook.pdf">
          {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
        </PDFDownloadLink>
      ) : (
        <p>No logs available for export.</p>
      )}
    </div>
  );
};

export default DocumentComponent;
