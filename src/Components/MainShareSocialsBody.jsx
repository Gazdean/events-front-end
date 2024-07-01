import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
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

export default function MainShareSocialsBody({shareUrl, title}) {

    return (
        <Row>
            <Col className="share-column m-2 ms-3" style={{maxWidth:"55px"}}>
                <FacebookShareButton
                    url={shareUrl}
                    className="share-button"
                >
                <FacebookIcon size={40} round />
                </FacebookShareButton>

                <Col>
                <FacebookShareCount
                    url={shareUrl}
                    className="share-count"
                >
                    {(count) => count}
                </FacebookShareCount>
                </Col>
            </Col>

            <Col className="share-column m-2 ms-3" style={{maxWidth:"55px"}}>
                <FacebookMessengerShareButton
                    url={shareUrl}
                    appId="521270401588372"
                    className="share-button"
                >
                <FacebookMessengerIcon size={40} round />
                </FacebookMessengerShareButton>
            </Col>

            <Col className="share-column m-2 ms-3" style={{maxWidth:"55px"}}> 
                <TwitterShareButton
                    url={shareUrl}
                    title={title}
                    className="share-button"
                >
                <XIcon size={40} round />
                </TwitterShareButton>
            </Col>

            <Col className="share-column m-2 ms-3" style={{maxWidth:"55px"}}>
                <TelegramShareButton
                    url={shareUrl}
                    title={title}
                    className="share-button"
                >
                <TelegramIcon size={40} round />
                </TelegramShareButton>
            </Col>

            <Col className="share-column m-2 ms-3" style={{maxWidth:"55px"}}>
                <WhatsappShareButton
                    url={shareUrl}
                    title={title}
                    separator=":: "
                    className="share-button"
                >
                <WhatsappIcon size={40} round />
                </WhatsappShareButton>
            </Col>

            <Col className="share-column m-2 ms-3" style={{maxWidth:"55px"}}>
                <LinkedinShareButton
                    url={shareUrl}
                    className="share-button"
                >
                <LinkedinIcon size={40} round />
                </LinkedinShareButton>
            </Col>
        </Row>
    )
}
