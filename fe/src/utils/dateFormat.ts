type DateInput = string | null | undefined | { date: string; timezone_type: number; timezone: string };

export function formatDate(dateInput: DateInput): string {
  if (!dateInput) {
    return 'N/A';
  }

  try {
    // Handle PHP DateTime object format
    let dateString: string;
    if (typeof dateInput === 'object' && 'date' in dateInput) {
      dateString = dateInput.date;
    } else {
      dateString = dateInput as string;
    }

    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', dateInput);
      return 'Invalid date';
    }

    return date.toLocaleDateString();
  } catch (error) {
    console.error('Error formatting date:', dateInput, error);
    return 'Invalid date';
  }
}

export function formatDateTime(dateInput: DateInput): string {
  if (!dateInput) {
    return 'N/A';
  }

  try {
    // Handle PHP DateTime object format
    let dateString: string;
    if (typeof dateInput === 'object' && 'date' in dateInput) {
      dateString = dateInput.date;
    } else {
      dateString = dateInput as string;
    }

    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', dateInput);
      return 'Invalid date';
    }

    return date.toLocaleString();
  } catch (error) {
    console.error('Error formatting date:', dateInput, error);
    return 'Invalid date';
  }
}
