import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation } from 'react-router-dom';
import repinfo from '../text/repinfo.json';
import Table from 'react-bootstrap/Table';

const info = repinfo;

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function takevalues(x){
	const y = Object.values(x);
	return y;
}

function printauthors(as) {
	const myauthors = as.map((a) => a + "; ")
	return myauthors;
}

function TabRep() {

	const list = Object.keys(info.repos).map(key => ({[key]: info.repos[key]}));

	const values = Object.values(list[0]);
	const keys = Object.keys(values[0]);
	var size = 3;
	var myhead = keys.slice(0,size);

	return(
		<div>
		<Table>
		  <thead>
		   <tr>
		   	{myhead.map((item) => <th key={item}> {item} </th> )}
		   </tr>
		  </thead>
		  <tbody>
			{list.map((info) => takevalues(info).map((i) => 
				<tr key={i.id}>
				<td>{i.id}</td>
				<td>{i.Title}</td>
				<td>{printauthors(i.Authors)}</td>
				</tr>))}
		  </tbody>
		</Table>
		</div>
		);
}

function TabDocs() {
	const list = Object.keys(info.docs).map(key => ({[key]: info.docs[key]}));

	const values = Object.values(list[0]);
	const keys = Object.keys(values[0]);
	var size = 5;
	var myhead = keys.slice(0,size);

	return(
		<div>
		<Table>
		  <thead>
		   <tr>
		   	{myhead.map((item) => <th key={item}> {item} </th> )}
		   </tr>
		  </thead>
		  <tbody>
			{list.map((info) => takevalues(info).map((i) => 
				<tr key={i.id}>
				<td>{i.id}</td>
				<td>{i.Title}</td>
				<td>{printauthors(i.Authors)}</td>
				<td>{i.Date}</td>
				<td>{i.Type}</td>
				</tr>))}
		  </tbody>
		</Table>
		</div>
		);
}

function ItemContent() {

	let query = useQuery();

	const type = query.get("type");
	const id = query.get("id");

	var list =[];

	if ("rep" === type ) {
		var list = Object.keys(info.repos).map(key => ({[key]: info.repos[key]}));
	}
	else { 
		var list = Object.keys(info.docs).map(key => ({[key]: info.docs[key]}));
	}

	const myvalue= list[id];

	console.log(myvalue)

	return (
		<div>
				<Container>
					<Row>
					<Col lg={10}>
						<Row>
						<Col md={11}>
							<h1> {type} {id}</h1>

						</Col>
						</Row>
					</Col>
					</Row>
				</Container>
		</div>
	);
}

function Item() {
	return (
		<div>
		<br/>
		<br/>
		<Container>
		   <Row>
	       <Col md={2}>
	       </Col>
	       <Col md={10}>
	        <ItemContent />
	       </Col>
	       </Row>
		</Container>

		</div>
	);
}

export default Item;