import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './contact.css'

const Contact =() =>{

    const styles = theme => ({
        table: {
           height: "100px",
           borderBottom: "2px solid gray" 
        },
        tableHead: {
           border: "1px solid #d0d0d0",
           height: "25px",
           background: "#f2f2f2",
           display: "block",
        },
        tableHeaderRow: {
           height: "25px",
           width: "100%",
           display: "table",
        },
        tableHeaderCell: {
           border: "1px solid #d0d0d0",
        },
        tableBody: {
           height: "100px", 
           marginTop: "theme.spacing.unit * 3", 
           overflowY: "auto",
           overflowX: "hidden",
           border: "1px solid grey",
           display: "block"
        },
        tableBodyRow: {
           height: "15px",
           borderRight: "2px solid #d0d0d0",
           display: "table",
           width: "100%",
        }
   
   });
    
      
      function createData(criteria, global, managers, sritical, comments) {
        return { criteria, global, managers, sritical, comments };
      }
      
      const rows = [
        createData('GOVERNANCE', '4,00', '4,50', 'High','All the responents are very satification with the safety at the factory'),
        createData('HUMAN RIGHTS', '2,38', '3,25', 'Low','Globaly, workes and managers are comfortable with thier worklife at the company'),
        createData('CONSUMER ISSUES','4,87', '4,75', 'High', 'Some respondents clamied that overtime  was not suffciently paid'),
        createData('ENVIRONMENT', '4,37', '3,75','High','Employees consider met their working hours are realy client'),
        createData('COMMUNITY INVOLVMENT AND DEVELOPMENT', '4,75','5,00', 'Very high','Many of the respondents siad that they testifiend aduses with migrant workers in the premises in the test month'),
        createData('LABOR','4,00','5,00','High','Mulitiple respodents declaned having seen child working at the factory in the test month'),
        createData('FAIR OPERATING PRACTICES','2,70','3,10','Medium','')
      ];
    const classes = styles();

  return (
    <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>CRITERIA</TableCell>
          <TableCell align="right">GLOBAL SCORE</TableCell>
          <TableCell align="right">MANAGERS SCORE</TableCell>
          <TableCell align="right">CRITICAL LEVEL</TableCell>
          <TableCell align="right">COMMENTS</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.criteria}>
            
            { row.criteria==='CONSUMER ISSUES'|| row.criteria==='ENVIRONMENT' || row.criteria==='GOVERNANCE'|| row.criteria==='HUMAN RIGHTS' ? <TableCell id="criteria" component="th" scope="row">
              {row.criteria}
          </TableCell> :  <TableCell id="criteria1" component="th" scope="row">
            {row.criteria}
          </TableCell>  }
            <TableCell id="global" align="right">{row.global}</TableCell>
            <TableCell align="right">{row.managers}</TableCell>
            {row.sritical==='High' && <TableCell id="green" align="right">{row.sritical}</TableCell> || row.sritical==='Low' && <TableCell id="red" align="right">{row.sritical}</TableCell> || row.sritical==='Very high' && <TableCell id="veryhigh" align="right">{row.sritical}</TableCell> ||
            row.sritical==='Medium' && <TableCell id="Medium" align="right">{row.sritical}</TableCell>
            }
            <TableCell id="comments" align="right">{row.comments}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
}
export default Contact;