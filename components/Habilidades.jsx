import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";
import { gsap } from "gsap";

export default function Habilidades() {
  const [tooltip, setTooltip] = useState(false);
  const [tooltipObj, setTooltipObj] = useState(false);
  const [tooltipDiseño, setTooltipDiseño] = useState(false);
  const [tooltipMetodologia, setTooltipMetodologia] = useState(false);

  const [icon, setIcon] = useState("bottom");

  function onclickTooltipWeb() {
    if (tooltip === false) {
      setTooltip(true);
    }
  }
  function onclickTooltipObj() {
    if (tooltipObj === false) {
      setTooltipObj(true);
    }
  }
  function onclickTooltipDiseño() {
    if (tooltipDiseño === false) {
      setTooltipDiseño(true);
      setIcon("top");
    }
  }
  function onclickTooltipMetodologia() {
    if (tooltipMetodologia === false) {
      setTooltipMetodologia(true);
    }
  }

  const onEnter = ({ currentTarget }) => {
    gsap.to(currentTarget, { duration: 0.5, y: -15 });
  };

  const onLeave = ({ currentTarget }) => {
    gsap.to(currentTarget, { duration: 0.5, y: 0 });
  };
  return (
    <div id="habilidades-section" className="PadreHabilidades">
      <div data-aos="fade-down">
        <Button
          NormalWeights="black"
          className="botonesHabilidades"
          shadow
          color="warning"
          onClick={onclickTooltipWeb}
        >
          Web programming
        </Button>

        <Spacer y={3} />
      </div>
      <div>
        <div data-aos="fade-down" className="iconosHabilidades">
          <Tooltip
            placement="bottom"
            color="warning"
            content={
              <>
                <label className="labelTooltip">React.js</label>
              </>
            }
            visible={tooltip}
          >
            <IconButton
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
              component="span"
            >
              <Image
                src={"/habilidades/react.svg"}
                height="100%"
                width="100%"
                name="react"
                type="logo"
              />
            </IconButton>
          </Tooltip>
          <Tooltip
            placement="bottom"
            color="warning"
            content={
              <>
                <label className="labelTooltip">Next.js</label>
              </>
            }
            visible={tooltip}
          >
            <IconButton
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
              component="span"
            >
              <Image
                src={"/habilidades/next-js.svg"}
                height="100%"
                width="100%"
                name="react"
                type="logo"
              />
            </IconButton>
          </Tooltip>
          <Tooltip
            placement="bottom"
            color="warning"
            content={
              <>
                <label className="labelTooltip">Material UI</label>
              </>
            }
            visible={tooltip}
          >
            <IconButton
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
              component="span"
            >
              <Image
                src={"/habilidades/material-ui-1.svg"}
                height="100%"
                width="100%"
                name="react"
                type="logo"
              />
            </IconButton>
          </Tooltip>
          <Tooltip
            placement="bottom"
            color="warning"
            content={
              <>
                <label className="labelTooltip">Node.js</label>
              </>
            }
            visible={tooltip}
          >
            <IconButton
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
              component="span"
            >
              <Image
                src={"/habilidades/nodejs.svg"}
                height="100%"
                width="100%"
                name="react"
                type="logo"
              />
            </IconButton>
          </Tooltip>
          <Tooltip
            placement="bottom"
            color="warning"
            content={
              <>
                <label className="labelTooltip">PostgreSQL</label>
              </>
            }
            visible={tooltip}
          >
            <IconButton
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
              component="span"
            >
              <Image
                src={"/habilidades/postgresql.svg"}
                height="100%"
                width="100%"
                name="react"
                type="logo"
              />
            </IconButton>
          </Tooltip>
          <Tooltip
            placement="bottom"
            color="warning"
            content={
              <>
                <label className="labelTooltip">Express</label>
              </>
            }
            visible={tooltip}
          >
            <IconButton
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
              component="span"
            >
              <Image
                src={"/habilidades/express-109.svg"}
                height="100%"
                width="100%"
                name="react"
                type="logo"
              />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div>
        <Spacer y={3} />

        <Button
          data-aos="fade-down"
          className="botonesHabilidades"
          shadow
          color="warning"
          auto
          onClick={onclickTooltipObj}
        >
          Object-oriented programming
        </Button>
        <Spacer y={3} />
      </div>
      <div data-aos="fade-down" className="iconosHabilidades">
        <Tooltip
          placement="bottom"
          color="warning"
          content={
            <>
              <label className="labelTooltip">C Sharp</label>
            </>
          }
          visible={tooltipObj}
        >
          <IconButton
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            component="span"
          >
            <Image
              src={"/habilidades/c--4.svg"}
              height="100%"
              width="100%"
              name="react"
              type="logo"
            />
          </IconButton>
        </Tooltip>
        <Tooltip
          placement="bottom"
          color="warning"
          content={
            <>
              <label className="labelTooltip">SQL Server</label>
            </>
          }
          visible={tooltipObj}
        >
          <IconButton
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            component="span"
          >
            <Image
              src={"/habilidades/microsoft-sql-serverl--logo.svg"}
              height="100%"
              width="100%"
              name="react"
              type="logo"
            />
          </IconButton>
        </Tooltip>
        <Tooltip
          placement="bottom"
          color="warning"
          content={
            <>
              <label className="labelTooltip">My SQL </label>
            </>
          }
          visible={tooltipObj}
        >
          <IconButton
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            component="span"
          >
            <Image
              src={"/habilidades/mysql.svg"}
              height="100%"
              width="100%"
              name="react"
              type="logo"
            />
          </IconButton>
        </Tooltip>
      </div>
      <div>
        <Spacer y={3} />

        <Button
          data-aos="fade-down"
          className="botonesHabilidades"
          shadow
          color="warning"
          auto
          onClick={onclickTooltipDiseño}
        >
          Graphic design
        </Button>
        <Spacer y={3} />
      </div>
      <div data-aos="fade-down" className="iconosHabilidades">
        <Tooltip
          placement={icon}
          color="warning"
          content={
            <>
              <label className="labelTooltip">Adobe Photoshop</label>
            </>
          }
          visible={tooltipDiseño}
        >
          <IconButton
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            component="span"
          >
            <Image
              src={"/habilidades/adobe-photoshop-2.svg"}
              height="100%"
              width="100%"
              name="react"
              type="logo"
            />
          </IconButton>
        </Tooltip>
        <Tooltip
          placement="bottom"
          color="warning"
          content={
            <>
              <label className="labelTooltip">Adobe Photoshop Lightroom</label>
            </>
          }
          visible={tooltipDiseño}
        >
          <IconButton
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            component="span"
          >
            <Image
              src={"/habilidades/adobe-photoshop-lightroom-cc-icon.svg"}
              height="100%"
              width="100%"
              name="react"
              type="logo"
            />
          </IconButton>
        </Tooltip>
        <Tooltip
          placement={icon}
          color="warning"
          content={
            <>
              <label className="labelTooltip">Adobe Illustrator</label>
            </>
          }
          visible={tooltipDiseño}
        >
          <IconButton
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            component="span"
          >
            <Image
              src={"/habilidades/adobe-illustrator-cc-icon.svg"}
              height="100%"
              width="100%"
              name="react"
              type="logo"
            />
          </IconButton>
        </Tooltip>
        <Tooltip
          placement="bottom"
          color="warning"
          content={
            <>
              <label className="labelTooltip">Adobe Indesign</label>
            </>
          }
          visible={tooltipDiseño}
        >
          <IconButton
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            component="span"
          >
            <Image
              src={"/habilidades/adobe-indesign-cc-icon.svg"}
              height="100%"
              width="100%"
              name="react"
              type="logo"
            />
          </IconButton>
        </Tooltip>
        <Tooltip
          placement={icon}
          color="warning"
          content={
            <>
              <label className="labelTooltip">Corel Draw</label>
            </>
          }
          visible={tooltipDiseño}
        >
          <IconButton
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            component="span"
          >
            <Image
              src={"/habilidades/corel-3.svg"}
              height="100%"
              width="100%"
              name="react"
              type="logo"
            />
          </IconButton>
        </Tooltip>
      </div>
      <div>
        <Spacer y={3} />

        <Button
          data-aos="fade-down"
          className="botonesHabilidades"
          shadow
          color="warning"
          auto
          onClick={onclickTooltipMetodologia}
        >
          Agile methodologies
        </Button>
        <Spacer y={3} />
      </div>
      <div data-aos="fade-down" className="iconosHabilidades">
        <Tooltip
          placement="bottom"
          color="warning"
          content={
            <>
              <label className="labelTooltip">Pair programming</label>
            </>
          }
          visible={tooltipMetodologia}
        >
          <IconButton
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            component="span"
          >
            <Image
              src={"/habilidades/Pairprogramming-rafiki.svg"}
              height="130%"
              width="120%"
              name="react"
              type="logo"
            />
          </IconButton>
        </Tooltip>
        <Tooltip
          placement="bottom"
          color="warning"
          content={
            <>
              <label className="labelTooltip">Scrum</label>
            </>
          }
          visible={tooltipMetodologia}
        >
          <IconButton
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            component="span"
          >
            <Image
              src={"/habilidades/scrumorg-1.svg"}
              height="100%"
              width="100%"
              name="react"
              type="logo"
            />
          </IconButton>
        </Tooltip>
        <Tooltip
          placement="bottom"
          color="warning"
          content={
            <>
              <label className="labelTooltip">Trello</label>
            </>
          }
          visible={tooltipMetodologia}
        >
          <IconButton
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            component="span"
          >
            <Image
              src={"/habilidades/trello.svg"}
              height="100%"
              width="100%"
              name="react"
              type="logo"
            />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}
