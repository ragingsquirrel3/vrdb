import {
  RaisedButton,
  DropDownMenu,
  MenuItem,
  Slider,
  Table,
  TableHeader,
  TableRow,
  TableHeaderColumn,
  TableBody,
  TableRowColumn
} from 'material-ui';
import _ from 'underscore';

const colorOptions = [
  { value: 'none', label: 'None '},
  { value: 'chip', label: 'Swi6 ChIP Seq'},
  { value: 'chromosome', label: 'Chromosome '}
];

class Index extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = this.getDefaultState();
  }

  componentDidMount() {
    this.s = io();
  }

  getDefaultState() {
    let defaultConfigs = this.getDefaultConfigs();
    return {
      colorBy: colorOptions[0],
      chrom: { value: 1, label: 1 },
      configs: defaultConfigs
    };
  }

  renderOrganismSelector() {
    return (
      <div>
        <label style={styles.label}>Organism</label>
        <DropDownMenu value={'Homo sapiens'}>
          <MenuItem value={'Homo sapiens'} primaryText='Homo sapiens' />
        </DropDownMenu>
      </div>
    );
  }

  renderModelSelector() {
    return (
      <div>
        <label style={styles.label}>Model</label>
        <DropDownMenu value={'Trieu et al. 2014'}>
          <MenuItem value={'Trieu et al. 2014'} primaryText='Trieu et al. 2014' />
        </DropDownMenu>
      </div>
    );
  }

  renderColorSelector() {
    let colorBy = this.state.colorBy;
    let _onChange = (e, i, newKey) => {
      let newVal = _.findWhere(colorOptions, { value: newKey });
      this.setState({ colorBy: newVal });
    }
    let options = colorOptions.map( (d, i) => {
      return <MenuItem value={d.value} primaryText={d.label} key={'color' + i} />
    });
    return (
      <div>
        <label style={styles.label}>Color By</label>
        <DropDownMenu value={colorBy.value} onChange={_onChange}>
          {options}
        </DropDownMenu>
      </div>
    );
  }

  renderLocationSelector() {
    // make chrom data
    let chromData = [];
    for (let i = 1; i <= 23; i++) {
      chromData.push({ value: i, label: i });
    }
    let chrom = this.state.chrom;
    let _onChange = (e, i, newKey) => {
      let newVal = _.findWhere(chromData, { value: newKey });
      this.setState({ chrom: newVal });
    }
    let options = chromData.map( (d, i) => {
      return <MenuItem value={d.value} primaryText={d.label} key={'color' + i} />
    });
    return (
      <div>
        <label style={styles.label}>Chromosome</label>
        <DropDownMenu value={chrom.value} onChange={_onChange}>
          {options}
        </DropDownMenu>
        <label style={styles.label}>Center Coordinate</label>
        <Slider />
      </div>
    );
  }

  getDefaultConfigs() {
    return [
      {
        id: '123abc',
        chromosome: 1,
        coordinate: 50000,
        colorBy: 'none'
      }
    ];
  }

  renderConfigs() {
    let rows = this.state.configs.map( (d, i) => {
      let onSync = (e) => {
        this.s.emit('sync', d);
      }
      return (
        <TableRow key={'row' + i}>
          <TableRowColumn><i>Homo sapiens</i></TableRowColumn>
          <TableRowColumn>Trieu et al. 2014</TableRowColumn>
          <TableRowColumn>chr{d.chromosome} {d.coordinate-10000}-{d.coordinate+ 10000}</TableRowColumn>
          <TableRowColumn>{d.colorBy}</TableRowColumn>
          <TableRowColumn>
            <RaisedButton label='Sync' primary onClick={onSync} />
          </TableRowColumn>
        </TableRow>
      );
    });
    return (
      <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Organism</TableHeaderColumn>
            <TableHeaderColumn>Model</TableHeaderColumn>
            <TableHeaderColumn>Location</TableHeaderColumn>
            <TableHeaderColumn>Color By</TableHeaderColumn>
            <TableHeaderColumn>Sync VR</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {rows}
        </TableBody>
      </Table>
    );
  }

  addToDataAndClear() {
    let newId = Math.round(Math.random() * 100000);
    let newEntry = {
      id: newId,
      chromosome: this.state.chrom.value,
      coordinate: 50000,
      colorBy: this.state.colorBy.value
    };
    let configs = this.state.configs;
    configs.push(newEntry);
    let defaultState = this.getDefaultState();
    this.setState({
      colorBy: defaultState.colorBy,
      chrom: defaultState.chrom,
      configs: configs
    });
  }

  render() {
    let handleAdd = (e) => {
      this.addToDataAndClear();
    }
    return (
      <div style={styles.container}>
        <div style={styles.menuContainer}>
          {this.renderOrganismSelector()}
          {this.renderModelSelector()}
          {this.renderColorSelector()}
          {this.renderLocationSelector()}
          <RaisedButton label='Save Configuration' onClick={handleAdd} />
        </div>
        <div>
          {this.renderConfigs()}
        </div>
      </div>
    );
  }
}

export default Index;


const styles = {
  container: {

  },
  menuContainer: {
    width: '15rem',
    float: 'left'
  },
  label: {
    display: 'block',
    marginTop: '1rem',
    fontWeight: 900
  }
};
