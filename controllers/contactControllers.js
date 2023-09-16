const asyncHandler = require("express-async-handler");
const Contacts = require("../models/contactModels");

//get all contacts
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contacts.find();
  res.status(200).json(contacts);
});

//create contact
const createContact = asyncHandler(async (req, res) => {
  console.log("the request body is :", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("all fields are mandatory");
  }
  const contact = await Contacts.create({
    name,
    email,
    phone,
  });
  res.status(200).json(contact);
});

//get contact
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//update contact
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const updatedContact = await Contacts.findByIdAndupdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

//delete contact
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  await Contacts.remove();
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
