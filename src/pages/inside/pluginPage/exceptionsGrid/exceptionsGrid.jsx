import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Grid } from 'components/grid';
import { getColumns } from './columns/getColumns';
import { ExceptionsGridSubInfo } from './subInfo';

@injectIntl
export class ExceptionsGrid extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  columns = getColumns(this.props.intl.formatMessage);

  render() {
    const { data } = this.props;
    const gridData = {
      items: data.map((item, index) => ({ ...item, id: index })),
    };

    return (
      <Grid
        data={gridData}
        columns={this.columns}
        withSubInfo
        subInfoComponent={ExceptionsGridSubInfo}
      />
    );
  }
}
