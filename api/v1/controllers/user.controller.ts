import e, { Request, Response } from "express";
import md5 from "md5";
import { generateRandomString } from "../../../helpers/generate";
import User from "../models/user.model";

//[POST] /api/v1/users/register
export const register = async (req: Request, res: Response) => {
  const emailExists = await User.findOne({
    email: req.body.email,
    deleted: false,
  });

  if (emailExists) {
    res.json({
      code: 400,
      message: "Email đã tồn tại",
    });
    return;
  } else {
    req.body.password = md5(req.body.password);

    req.body.token = generateRandomString(32);

    const user = new User(req.body);
    const data = await user.save();

    const token = data.token;

    res.json({
      code: 200,
      message: "Tạo tài khoản thành công",
      token: token,
    });
  }
};
