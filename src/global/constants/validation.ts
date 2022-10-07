const email = /^[0-9A-Za-z._]+@[A-Za-z]{2,}(\.[0-9A-Za-z]{2,})+$/;
const name = /^[A-Z]([a-z]{1,})$/;
const phoneNumber = /^((\+91)|0)?([0-9]{10})$/;

// PHD have 8 digits - 2 for year, 1 for degree, 2 for dept, 3 for roll no.
// BTech & MTech have 7 digits - 2 for year, 1 for degree, 1 for dept, 3 for roll no.
const scholarId = /^[1-2][0-9](([1-2][0-9]{4})|(3[0-9]{5}))$/;

const instituteEmail =
  /^[a-z]+[0-9]{2}_(ug|pg|rs)@[a-z]{3,4}[.]nits[.]ac[.]in$/;

// 1 Capital, 1 Digit, 1 Special Character, Total 8-20 characters both inclusive
// (?=.*?) is lookahead in JS RegExp
const password =
  /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+=[\]\\|<>,.?/:;"'])[A-Za-z0-9!@#$%^&*()_+\-=[\]\\|<>,.?/:;"']{8,20}$/;

// Characters Taken From:
// https://tutorial.eyehunts.com/js/url-with-special-characters-example-code/#:~:text=A%20URL%20is%20composed%20of,%22%20%2C%20%22~%22%20).&text=When%20these%20characters%20are%20not,URL%2C%20they%20must%20be%20encoded.
const url =
  /^http(s)?:\/\/([0-9A-Za-z-_~$&+,/:;=?@]*[.])+?[0-9A-Za-z-_~$&+,/:;=?@]+?(\/#[0-9A-Za-z-_~$&+,/:;=?@]+)?$/;

// 18 digit discord ID unique for everyone, and can't change for account.
const discord = /^[0-9]{18}$/;

export {
  email,
  name,
  phoneNumber,
  scholarId,
  instituteEmail,
  password,
  url,
  discord,
};
