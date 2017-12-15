const express = require('express');
const mongoose = require('mongoose');
const Rides = require('../models/rides-model');
const ensureLogin = require("connect-ensure-login");

const router = express.Router();
