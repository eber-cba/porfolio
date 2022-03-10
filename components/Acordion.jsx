import React from "react";
import { Collapse } from "@nextui-org/react";
import Button from "@mui/material/Button";
import GitHubIcon from '@mui/icons-material/GitHub';
export default function Acordion() {
  return (
    <div>
      <Collapse.Group className="colapsegrup" divider={false}>
        <Collapse
          title={<label className="titleColapse">PROFESSIONAL PRACTICE </label>}
          subtitle="TECHO (5 members)"
        >
          <label className="cuerpoColapse">
            I was part of the Front-End team developing views and logics for
            different components and implementing technology such as MUI for
            view layout
          </label>
          <br />
          <Button
            href="https://github.com/eber-cba/TECHO-Teams"
            className="botonColapso"
            variant="outlined"
            startIcon={<GitHubIcon/> }
          >
            repository
          </Button>
        </Collapse>

        <Collapse
          title={<label className="titleColapse">E-COMERCE </label>}
          subtitle="Adventure (6 members)"
        >
          <label className="cuerpoColapse">
            I integrated the Front-End team where I developed views and logic,
            as in the home, the search cards and several other components
          </label>
          <br />
          <Button
            href="https://github.com/eber-cba/ecommerce"
            className="botonColapso"
            variant="outlined"
            startIcon={<GitHubIcon/> }
          >
            repository
          </Button>
        </Collapse>
        <Collapse
          title={<label className="titleColapse">OMDB </label>}
          subtitle="OMDB (Single)"
        >
          <label className="cuerpoColapse">
            Creation of pages to search for movies or series.Creation and user
            login
          </label>
          <Button
            href="https://github.com/eber-cba/26-checkpoint-OMDB"
            className="botonColapso"
            variant="outlined"
            startIcon={<GitHubIcon/> }
          >
           <span  className="botonColapso"> repository </span> 
          </Button>
        </Collapse>
      </Collapse.Group>
    </div>
  );
}
