const email = /^[0-9A-Za-z._]+@[A-Za-z]{2,}(\.[0-9A-Za-z]{2,})+$/;
const name = /^[A-Z]([a-z]{1,})$/;
const phoneNumber = /^((\+91)|0)?([0-9]{10})$/;

// PHD have 8 digits - 2 for year, 1 for degree, 2 for dept, 3 for roll no.
// BTech & MTech have 7 digits - 2 for year, 1 for degree, 1 for dept, 3 for roll no.
const scholarId = /^[1-2][0-9](([1-2][0-9]{4})|(3[0-9]{5}))$/;

const instituteEmail =
  /^[a-z]+[0-9]{2}_(ug|pg|rs)@[a-z]{3,4}[.]nits[.]ac[.]in$/;

export { email, name, phoneNumber, scholarId, instituteEmail };
