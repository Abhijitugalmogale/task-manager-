const express = require('express');
const router = express.Router();
const Account = require('../models/Account');

// Add a new account
router.post('/', async (req, res) => {
  try {
    const account = new Account(req.body);
    await account.save();
    res.status(201).json(account);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all accounts
router.get('/', async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update balance and lastUpdated
router.put('/:id', async (req, res) => {
  try {
    const { balance, planAmount, alertTime, notificationId, accountName, email } = req.body;
    
    // Create an update object
    const updateData = { lastUpdated: new Date() };
    if (balance !== undefined) updateData.balance = balance;
    if (planAmount !== undefined) updateData.planAmount = planAmount;
    if (alertTime !== undefined) updateData.alertTime = alertTime;
    if (notificationId !== undefined) updateData.notificationId = notificationId;
    if (accountName !== undefined) updateData.accountName = accountName;
    if (email !== undefined) updateData.email = email;

    const updatedAccount = await Account.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!updatedAccount) return res.status(404).json({ message: 'Account not found' });
    res.json(updatedAccount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
