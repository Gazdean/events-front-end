import React from "react";
import { Col, Row } from "react-bootstrap";
import exampleImage from "../../readme-images/signIn.png";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  FacebookShareCount,
  GabIcon,
  GabShareButton,
  HatenaIcon,
  HatenaShareButton,
  HatenaShareCount,
  InstapaperIcon,
  InstapaperShareButton,
  LineIcon,
  LineShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  LivejournalIcon,
  LivejournalShareButton,
  MailruIcon,
  MailruShareButton,
  OKIcon,
  OKShareButton,
  OKShareCount,
  PinterestIcon,
  PinterestShareButton,
  PinterestShareCount,
  PocketIcon,
  PocketShareButton,
  RedditIcon,
  RedditShareButton,
  RedditShareCount,
  TelegramIcon,
  TelegramShareButton,
  TumblrIcon,
  TumblrShareButton,
  TumblrShareCount,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  VKIcon,
  VKShareButton,
  VKShareCount,
  WeiboIcon,
  WeiboShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  WorkplaceIcon,
  WorkplaceShareButton,
  XIcon,
} from "react-share";

export default function ShareMoreSocialsBody({ shareUrl, title }) {
  return (
    <Row>
      <Col className="share-column m-2 ms-3" style={{ maxWidth: "55px" }}>
        <FacebookShareButton url={shareUrl} className="share-button">
          <FacebookIcon size={40} round />
        </FacebookShareButton>

        <Col>
          <FacebookShareCount url={shareUrl} className="share-count">
            {(count) => count}
          </FacebookShareCount>
        </Col>
      </Col>

      <Col className="share-column m-2 ms-3" style={{ maxWidth: "55px" }}>
        <FacebookMessengerShareButton
          url={shareUrl}
          appId="521270401588372"
          className="share-button"
        >
          <FacebookMessengerIcon size={40} round />
        </FacebookMessengerShareButton>
      </Col>

      <Col className="share-column m-2 ms-3" style={{ maxWidth: "55px" }}>
        <TwitterShareButton
          url={shareUrl}
          title={title}
          className="share-button"
        >
          <XIcon size={40} round />
        </TwitterShareButton>
      </Col>

      <Col className="share-column m-2 ms-3" style={{ maxWidth: "55px" }}>
        <TelegramShareButton
          url={shareUrl}
          title={title}
          className="share-button"
        >
          <TelegramIcon size={40} round />
        </TelegramShareButton>
      </Col>

      <Col className="share-column m-2 ms-3" style={{ maxWidth: "55px" }}>
        <WhatsappShareButton
          url={shareUrl}
          title={title}
          separator=":: "
          className="share-button"
        >
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>
      </Col>

      <Col className="share-column m-2 ms-3" style={{ maxWidth: "55px" }}>
        <LinkedinShareButton url={shareUrl} className="share-button">
          <LinkedinIcon size={40} round />
        </LinkedinShareButton>
      </Col>

      <Col className="share-column m-2 ms-3" style={{ maxWidth: "55px" }}>
        <PinterestShareButton
          url={String(window.location)}
          media={`${String(window.location)}/${exampleImage}`}
          className="share-button"
        >
          <PinterestIcon size={40} round />
        </PinterestShareButton>

        <Col>
          <PinterestShareCount url={shareUrl} className="share-count" />
        </Col>
      </Col>

      <Col className="share-column m-2 ms-3" style={{ maxWidth: "55px" }}>
        <VKShareButton
          url={shareUrl}
          image={`${String(window.location)}/${exampleImage}`}
          className="share-button"
        >
          <VKIcon size={40} round />
        </VKShareButton>

        <Col>
          <VKShareCount url={shareUrl} className="share-count" />
        </Col>
      </Col>

      <Col className="share-column m-2 ms-3" style={{ maxWidth: "55px" }}>
        <OKShareButton
          url={shareUrl}
          image={`${String(window.location)}/${exampleImage}`}
          className="share-button"
        >
          <OKIcon size={40} round />
        </OKShareButton>

        <Col>
          <OKShareCount url={shareUrl} className="share-count" />
        </Col>
      </Col>

      <Col className="share-column m-2 ms-3" style={{ maxWidth: "55px" }}>
        <RedditShareButton
          url={shareUrl}
          title={title}
          windowWidth={660}
          windowHeight={460}
          className="share-button"
        >
          <RedditIcon size={40} round />
        </RedditShareButton>

        <Col>
          <RedditShareCount url={shareUrl} className="share-count" />
        </Col>
      </Col>

      <Col className="share-column m-2 ms-3" style={{ maxWidth: "55px" }}>
        <GabShareButton
          url={shareUrl}
          title={title}
          windowWidth={660}
          windowHeight={640}
          className="share-button"
        >
          <GabIcon size={40} round />
        </GabShareButton>
      </Col>

      <Col className="share-column m-2 ms-3" style={{ maxWidth: "55px" }}>
        <TumblrShareButton
          url={shareUrl}
          title={title}
          className="share-button"
        >
          <TumblrIcon size={40} round />
        </TumblrShareButton>

        <Col>
          <TumblrShareCount url={shareUrl} className="share-count" />
        </Col>
      </Col>

      <Col className="share-column m-2 ms-3" style={{ maxWidth: "55px" }}>
        <LivejournalShareButton
          url={shareUrl}
          title={title}
          description={shareUrl}
          className="share-button"
        >
          <LivejournalIcon size={40} round />
        </LivejournalShareButton>
      </Col>

      <Col className="share-column m-2 ms-3" style={{ maxWidth: "55px" }}>
        <MailruShareButton
          url={shareUrl}
          title={title}
          className="share-button"
        >
          <MailruIcon size={40} round />
        </MailruShareButton>
      </Col>

      <Col className="share-column m-2 ms-3" style={{ maxWidth: "55px" }}>
        <EmailShareButton
          url={shareUrl}
          subject={title}
          body="body"
          className="share-button"
        >
          <EmailIcon size={40} round />
        </EmailShareButton>
      </Col>

      <Col className="share-column m-2 ms-3" style={{ maxWidth: "55px" }}>
        <ViberShareButton url={shareUrl} title={title} className="share-button">
          <ViberIcon size={40} round />
        </ViberShareButton>
      </Col>

      <Col className="share-column m-2 ms-3" style={{ maxWidth: "55px" }}>
        <WorkplaceShareButton
          url={shareUrl}
          quote={title}
          className="share-button"
        >
          <WorkplaceIcon size={40} round />
        </WorkplaceShareButton>
      </Col>

      <Col className="share-column m-2 ms-3" style={{ maxWidth: "55px" }}>
        <LineShareButton url={shareUrl} title={title} className="share-button">
          <LineIcon size={40} round />
        </LineShareButton>
      </Col>

      <Col className="share-column m-2 ms-3" style={{ maxWidth: "55px" }}>
        <WeiboShareButton
          url={shareUrl}
          title={title}
          image={`${String(window.location)}/${exampleImage}`}
          className="share-button"
        >
          <WeiboIcon size={40} round />
        </WeiboShareButton>
      </Col>

      <Col className="share-column m-2 ms-3" style={{ maxWidth: "55px" }}>
        <PocketShareButton
          url={shareUrl}
          title={title}
          className="share-button"
        >
          <PocketIcon size={40} round />
        </PocketShareButton>
      </Col>

      <Col className="share-column m-2 ms-3" style={{ maxWidth: "55px" }}>
        <InstapaperShareButton
          url={shareUrl}
          title={title}
          className="share-button"
        >
          <InstapaperIcon size={40} round />
        </InstapaperShareButton>
      </Col>

      <Col className="share-column m-2 ms-3" style={{ maxWidth: "55px" }}>
        <HatenaShareButton
          url={shareUrl}
          title={title}
          windowWidth={660}
          windowHeight={460}
          className="share-button"
        >
          <HatenaIcon size={40} round />
        </HatenaShareButton>

        <Col>
          <HatenaShareCount url={shareUrl} className="share-count" />
        </Col>
      </Col>
    </Row>
  );
}
