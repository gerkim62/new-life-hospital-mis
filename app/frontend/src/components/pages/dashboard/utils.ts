interface MedicalRecord {
  date: string | Date;
  [key: string]: unknown; // Allow for additional properties
}

interface MedicalRecords {
  labs: MedicalRecord[];
  admissions: MedicalRecord[];
  medications: MedicalRecord[];
  others: MedicalRecord[];
}

type TimeFrame = "daily" | "weekly" | "monthly" | "yearly";

/**
 * Filter medical records based on time period
 * @param {MedicalRecords} records - Object containing arrays of medical records
 * @param {TimeFrame} timeFrame - Time period to filter by
 * @returns {MedicalRecords} Filtered records matching the specified time period
 */
function filterMedicalRecords(
  records: MedicalRecords,
  timeFrame: TimeFrame
): MedicalRecords {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Start of current week (Sunday)
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  const getStartDate = (period: TimeFrame): Date => {
    switch (period) {
      case "daily":
        return startOfDay;
      case "weekly":
        return startOfWeek;
      case "monthly":
        return startOfMonth;
      case "yearly":
        return startOfYear;
      default:
        throw new Error(`Invalid time period: ${period}`);
    }
  };

  const startDate = getStartDate(timeFrame);

  const filterByDate = (items: MedicalRecord[]): MedicalRecord[] => {
    return items.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= now;
    });
  };

  return {
    labs: filterByDate(records.labs),
    admissions: filterByDate(records.admissions),
    medications: filterByDate(records.medications),
    others: filterByDate(records.others),
  };
}

export { filterMedicalRecords };
