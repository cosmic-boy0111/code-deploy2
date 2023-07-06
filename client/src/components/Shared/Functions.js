

const checkAgo = (time) => {
  if (time <= 24) {
    return `${time} hours ago`
  } else if (time <= 730) {
    return `${ parseInt(Math.floor(time / 24))} days ago`
  } else if (time <= 8766) {
    return `${ parseInt(Math.floor(time / 24) / 30)} months ago`
  }

  return `${ parseInt(Math.floor(time / 24) / 365)} years ago`
}

export const convertDateToActualTime = (time) => {

  const date1 = new Date();
  const date2 = new Date(time);

  const difference = Math.abs(date1.getTime() - date2.getTime()) / 3600000

  if(difference < 1){
    if(Math.floor(difference * 60) === 0) return `now`
    return `${Math.floor(difference * 60)} minute ago`
  }

  return checkAgo( parseInt(difference));

}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const formatDate = (date) => {
  const newDate = new Date(date);
  return `${padTo2Digits(newDate.getDate())} ${months[newDate.getMonth()]} ${newDate.getFullYear()}`
}

function getExtension(filename) {
  var parts = filename.split('.');
  return parts[parts.length - 1];
}

export const checkFile = (filename) => {
  var ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'bmp':
    case 'png':
    case 'svg':
      return true;
    default:
  }
  return false;
}


const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const fileToBase64 = async (file) => {
  return await toBase64(file);
}


export const getSixMonths = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const previousMonths = [];

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  for (let i = 0; i <= 5; i++) {
    const previousMonth = new Date(currentYear, currentMonth - i, 1);
    const monthName = monthNames[previousMonth.getMonth()];
    previousMonths.push(monthName);
  }

  previousMonths.reverse();

  return previousMonths;

}

export const getSixMonthsData = (months) => {

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentMonthIndex = currentMonth; // example current month index (February)

  const next_array = months.slice(currentMonthIndex + 1, months.length)
  const pre_array = months.slice(0, currentMonthIndex + 1)

  const newMonths = [...next_array, ...pre_array]

  console.log(newMonths);

  return newMonths.slice(newMonths.length - 6, newMonths.length)

}
