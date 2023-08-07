import { Fragment } from "react";
import Document, {
 Head,
 Main,
 NextScript,
 DocumentInitialProps,
 DocumentContext,
} from "next/document";

interface DocumentProps extends DocumentInitialProps {
 isProduction: boolean;
}

export default class CustomDocument extends Document<DocumentProps> {
 static async getInitialProps(ctx: DocumentContext): Promise<DocumentProps> {
  const initialProps = await Document.getInitialProps(ctx);

  // Check if in production
  const isProduction = process.env.NODE_ENV === "production";

  return {
   ...initialProps,
   isProduction,
  };
 }

 render() {
  const { isProduction } = this.props;

  return (
   <html lang="en">
    <Head>
     {/* We only want to add the scripts if in production */}
     {isProduction && <Fragment></Fragment>}
    </Head>
    <body>
     <Main />
     <NextScript />
    </body>
   </html>
  );
 }
}
