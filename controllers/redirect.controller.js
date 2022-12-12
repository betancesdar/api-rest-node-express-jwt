import { Link } from "../models/Link.js";

export const redirectLink = async (req, res) => {
  try {
    const { nanoLink } = req.params;
    const link = await Link.findOne(nanoLink);

    if (!link) return res.status(404).json({ error: "Link does not exist" });

    return res.redirect(link.originLink);
  } catch (error) {
    console.log(error);
    if (error.kind === "objectId") {
      return res.status(403).json({ error: "Format id it is incorrect" });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};
