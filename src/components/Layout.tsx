import { MDXFrontMatter } from "*.mdx"
import formatDate from "@/utils/formatDate"
import widont from "@/utils/widont"
import { ReactNode } from "react"
import siteConfig from "../data/siteconfig.json"
import { Atoms, H1, P, Small } from "./designSystem"
import DesignSystemProvider from "./designSystem/DesignSystemProvider"
import Footer from "./Footer"
import GlobalStyles from "./GlobalStyles"
import Header from "./Header"
import Metatags from "./Metatags"
import SkipLink from "./SkipLink"
import Wrapper from "./Wrapper"

type LayoutProps = {
  frontMatter?: MDXFrontMatter
  children: ReactNode
}

const Content = ({ frontMatter, children }: LayoutProps) => {
  const site = siteConfig
  const title = frontMatter?.title || site.title
  const isRoot = title == site.title
  const date = frontMatter?.date
  const formattedDate = formatDate(date || "")
  const excerpt = frontMatter?.excerpt
  const ogSlug = frontMatter?.ogSlug

  return (
    <>
      <Metatags
        description={excerpt || site.description}
        thumbnail={
          ogSlug
            ? `https://${process.env.VERCEL_URL}/og/${ogSlug}`
            : `https://${process.env.VERCEL_URL}/images/og.png`
        }
        title={title}
      />
      <SkipLink />
      <Header siteTitle={site.title} />
      <Wrapper>
        {!isRoot && (
          <header>
            <H1>{widont(title)}</H1>
            {date && (
              <P>
                <time>
                  <Small>Published {formattedDate}</Small>
                </time>
              </P>
            )}
          </header>
        )}
        {children}
      </Wrapper>
      <Footer />

      <style jsx>{`
        header {
          margin-bottom: ${Atoms.spacing.medium};
          padding-bottom: ${Atoms.spacing.medium};
        }

        header :global(h1) {
          margin-bottom: 0 !important;
          padding-bottom: 0 !important;
        }
      `}</style>
    </>
  )
}

export default function Layout({ children, frontMatter }: LayoutProps) {
  return (
    <DesignSystemProvider>
      <Content frontMatter={frontMatter}>{children}</Content>
      <GlobalStyles />
    </DesignSystemProvider>
  )
}
