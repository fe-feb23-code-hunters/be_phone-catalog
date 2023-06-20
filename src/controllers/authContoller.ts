import {
  createUser,
  getUserByEmail,
  updateUser,
} from '../servises/authService';
import { hash, genSalt, compare } from 'bcryptjs';
import { generateRandomPassword } from '../utils/generatePassword';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const signUp = async(req, res) => {
  const email = req.body?.email;
  const password = req.body?.password;

  if (!email || !password) {
    return res.sendStatus(400);
  }

  if (password.length <= 8) {
    return res
      .status(400)
      .send('The password length should be at least 8 symbols');
  }

  const checkedUser = await getUserByEmail(email);

  if (checkedUser) {
    return res.status(400).send('The user is already signed up');
  }

  try {
    const salt = await genSalt(10);

    const hashedPassword = await hash(password, salt);

    const user = await createUser(email, hashedPassword);

    return res.status(201).send(user);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};

export const logIn = async(req, res) => {
  const email = req.body?.email;
  const password = req.body?.password;

  if (!email || !password) {
    return res.sendStatus(400);
  }

  try {
    const checkedUser = await getUserByEmail(email);

    if (!checkedUser) {
      return res.status(404).send('There is no such user');
    }

    const isPasswordValid = await compare(password, checkedUser.password);

    if (!isPasswordValid) {
      return res.status(403).send('The password is wrong');
    }

    return res.status(200).send({ isLoggedIn: true });
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};

export const resetPassword = async(req, res) => {
  const email = req.body?.email;

  if (!email) {
    return res.sendStatus(400);
  }

  const checkedUser = await getUserByEmail(email);

  if (!checkedUser) {
    return res.status(404).send('There is no such user');
  }

  const password = generateRandomPassword(8);

  try {
    const salt = await genSalt(10);

    const hashedPassword = await hash(password, salt);

    await updateUser(checkedUser.id, { password: hashedPassword });

    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.sendinblue.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: 'nice.gadgets@shop.com',
      to: email,
      subject: '[Nice Gadgets] Reset password',
      text: `Your new password: ${password}`,
    };

    transporter.sendMail(mailOptions, () => {
      res.status(200).send('Password has been reseted. Check your email');
    });
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};
