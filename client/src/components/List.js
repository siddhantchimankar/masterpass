import React from 'react';
import CryptoJS from 'crypto-js';
import {
	Container,
	Dropdown,
	Grid,
	Header,
	Icon,
	List,
	Divider
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { DeletePassword, DeleteCard, DeleteText } from './Delete';

const key = sessionStorage.getItem('key');

const capitalize = str => {
	if (typeof str === 'string') {
		return str.replace(/^\w/, c => c.toUpperCase());
	} else {
		return '';
	}
};

const PasswordsList = ({ passwords }) => {
	return (
		<>
			{passwords ? (
				passwords.map((password, index) => (
					<Container key={index}>
						{index !== 1 ? null : <Divider />}
						<Grid columns={16}>
							<Grid.Row>
								<Grid.Column>
									<Icon name='key' />
								</Grid.Column>
								<Grid.Column width={12}>
									<Header
										as={Link}
										to={`/passwords/${password._id}`}
									>
										{capitalize(
											CryptoJS.AES.decrypt(
												password.label,
												key
											).toString(CryptoJS.enc.Utf8)
										)}
									</Header>
									<p style={{ color: '#4f4f4f' }}>
										{'Username: ' +
											CryptoJS.AES.decrypt(
												password.notes,
												key
											).toString(CryptoJS.enc.Utf8)}
									</p>
								</Grid.Column>
								<Grid.Column width={2}>
									<Dropdown
										icon='ellipsis vertical'
										direction='left'
										pointing={'top right'}
										closeOnChange
									>
										<Dropdown.Menu>
											<Dropdown.Item
												icon='edit outline'
												text='Edit'
											/>
											<DeletePassword
												passwordId={password._id}
											/>
										</Dropdown.Menu>
									</Dropdown>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Container>
				))
			) : (
				<h1>None</h1>
			)}
		</>
	);
};

const CardsList = ({ cards }) => {
	return (
		<>
			{cards ? (
				cards.map((card, index) => (
					<Container key={index}>
						{index !== 1 ? null : <Divider />}
						<Grid columns={16}>
							<Grid.Row>
								<Grid.Column>
									<Icon name='credit card' />
								</Grid.Column>
								<Grid.Column width={12}>
									<Header as={Link} to={`/cards/${card._id}`}>
										{capitalize(
											CryptoJS.AES.decrypt(
												card.label,
												key
											).toString(CryptoJS.enc.Utf8)
										)}
									</Header>
									<p style={{ color: '#4f4f4f' }}>
										{'Card number : ' +
											CryptoJS.AES.decrypt(
												card.cardNumber,
												key
											).toString(CryptoJS.enc.Utf8)}
									</p>
								</Grid.Column>
								<Grid.Column width={2}>
									<Dropdown
										icon='ellipsis vertical'
										direction='left'
										pointing={'top right'}
										closeOnChange
									>
										<Dropdown.Menu>
											<Dropdown.Item
												icon='edit outline'
												text='Edit'
											/>
											<DeleteCard cardId={card._id} />
										</Dropdown.Menu>
									</Dropdown>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Container>
				))
			) : (
				<h1>None</h1>
			)}
		</>
	);
};

const TextsList = ({ texts }) => {
	return (
		<List>
			{texts ? (
				texts.map((text, index) => (
					<Container key={index}>
						{index !== 1 ? null : <Divider />}
						<Grid columns={16}>
							<Grid.Row>
								<Grid.Column>
									<Icon name='text cursor' />
								</Grid.Column>
								<Grid.Column width={12}>
									<Header as={Link} to={`/texts/${text._id}`}>
										{capitalize(
											CryptoJS.AES.decrypt(
												text.label,
												key
											).toString(CryptoJS.enc.Utf8)
										)}
									</Header>
									<p style={{ color: '#4f4f4f' }}>Text</p>
								</Grid.Column>
								<Grid.Column width={2}>
									<Dropdown
										icon='ellipsis vertical'
										direction='left'
										pointing={'top right'}
										closeOnChange
									>
										<Dropdown.Menu>
											<Dropdown.Item
												icon='edit outline'
												text='Edit'
											/>
											<DeleteText textId={text._id} />
										</Dropdown.Menu>
									</Dropdown>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Container>
				))
			) : (
				<h1>None</h1>
			)}
		</List>
	);
};

export { PasswordsList, CardsList, TextsList };
