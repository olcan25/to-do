// composables/useDateFormatter.js
export function useDateFormatter() {
  function formatDate(date) {
    if (!date) return ''; // Eğer tarih boşsa, boş bir string döndür
    const [year, month, day] = date.split('-'); // Tarihi parçala
    return `${day}.${month}.${year}`; // İstediğiniz formatta birleştir
  }

  return {
    formatDate,
  };
}
