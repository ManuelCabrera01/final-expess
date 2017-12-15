const express = require('express');
const mongoose = require('mongoose');
const User = require ('../models/user-model');
const RidesModel = require ('../models/rides-model');
const Comment = require('../comment/rides-model');
const ensureLogin = require("connect-ensure-login");

const router = express.Router();
