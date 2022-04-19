import moment from 'jalali-moment';
moment.locale('fa', { useGregorianParser: true });
export const jalaliDate = (date) => {
  return moment(date).format('jD jMMMM jYYYY');
};

export const jalaliDay = (date) => {
  return moment(date).format('dddd');
};

export const jalaliTime = (date) => {
  return moment(date).format('hh:mm:ss a');
};

export const fromNow = (date) => {
  return moment(date).startOf('minute').fromNow(true);
};

export const fromX = (date) => {
  var a = moment(new Date(date));
  var b = moment(new Date());
  return a.diff(b, 'days');
};
