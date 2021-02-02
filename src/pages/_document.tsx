import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document';

/**
 * Document Template
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.23
 */
class MyDocument extends Document {
  /**
   * Get Initial Props
   * @param {DocumentContext} ctx - document context
   * @returns {Promise<DocumentInitialProps>}
   */
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  /**
   * Render Method
   */
  render() {
    return (
      <Html>
        <Head>
          <style>{`body { display: block !important }`}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
