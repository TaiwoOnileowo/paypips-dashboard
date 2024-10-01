import Cors from "cors";

const cors = Cors({
  origin: ["https://paypips-dash.vercel.app", "https://www.paypipsbot.com"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Extension-ID",
    "Access-Control-Allow-Origin",
  ],
  credentials: true,
});

function runMiddleware(
  req: { method: string; headers: { origin: any } },
  res: {
    setHeader: (arg0: string, arg1: string) => void;
    status: (arg0: number) => {
      (): any;
      new (): any;
      end: { (): void; new (): any };
    };
  },
  fn: (arg0: any, arg1: any, arg2: (result: any) => void) => void
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default function corsMiddleware(handler: (arg0: any, arg1: any) => any) {
  return async (
    req: { method: string; headers: { origin: any } },
    res: {
      setHeader: (arg0: string, arg1: string) => void;
      status: (arg0: number) => {
        (): any;
        new (): any;
        end: { (): void; new (): any };
      };
    }
  ) => {
    if (req.method === "OPTIONS") {
      const allowedOrigins = [
        "https://paypips-dash.vercel.app",
        "https://www.paypipsbot.com",
      ];

      const origin = req.headers.origin;

      if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
      } else {
        res.setHeader("Access-Control-Allow-Origin", "*"); // For testing purposes
      }

      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, X-Extension-ID"
      );
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.status(204).end();
      return;
    }

    await runMiddleware(req, res, cors);
    return handler(req, res);
  };
}
