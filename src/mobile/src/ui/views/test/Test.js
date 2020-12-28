import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TextInput, ScrollView, RefreshControl, Keyboard, TouchableWithoutFeedback, FlatList} from 'react-native';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import { getData } from 'shared-modules/actions/ltcList';
import { getThemeFromState } from 'shared-modules/selectors/global';
import { getVersion, getBuildNumber } from 'react-native-device-info';
import SettingsBackButton from 'ui/components/SettingsBackButton';
import { width, height } from 'libs/dimensions';
import { Styling } from 'ui/theme/general';
import { leaveNavigationBreadcrumb } from 'libs/bugsnag';
import WithManualRefresh from 'ui/components/ManualRefresh';
import {throttle} from "lodash"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        justifyContent: 'center',
        // backgroundColor: "red"
    },
    textContainer:{
        flexDirection: 'row',
        justifyContent:"center",
        marginTop: 15,
        // backgroundColor: "blue"
    },
    textInput:{
        color: "#FFFFFF",
        width: width - 30,
        height: 40,
        paddingLeft: 16,
        backgroundColor: "#27292E",
        borderRadius: 20
    },
    topContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: "row",
        // backgroundColor: "green",
        borderBottomWidth: 1,
        borderBottomColor: '#333333',
        marginHorizontal: 17,
    },
    grey:{
        color: '#999999',
    },
    white:{
        color: '#FFFFFF',
    },
    textGrow:{
        flex: 1,
        fontSize: 15,
        fontWeight: 'normal',
        lineHeight: 40
    },
    textSmallGrow:{
        flex: .6,
        fontSize: 15,
        fontWeight: 'normal',
        lineHeight: 40
    },
    contentContainer: {
        // justifyContent: 'flex-start',
        // alignItems: 'flex-start',
        // flexDirection: "column",
        paddingHorizontal: 17,
        // backgroundColor: "green",
    }
});

const initQuery = {
    nodeId: '',
    pageNo: 1,
    pageSize: 20
}

/**
 * Advanced Settings component
 */
class Test extends PureComponent {
    static propTypes = {
        /** @ignore */
        t: PropTypes.func.isRequired,
        /** @ignore */
        theme: PropTypes.object.isRequired,
    };
    constructor(props){
        super(props);
        this.state = {
            isRefreshing: false,
            listQuery:Object.assign({},initQuery)
        };
        this._onRefresh = this._onRefresh.bind(this);
        this._onEndReached = this._onEndReached.bind(this);
        this._onChangeText = this._onChangeText.bind(this);
        this._renderItem = this._renderItem.bind(this);
        this._getData = throttle(this._getData, 100);
    }

    async _getData(isLoadMore){
        console.log(this.state.listQuery);
        await this.props.getData(this.state.listQuery,isLoadMore)
    }

    componentDidMount(){
        this._onRefresh()
    }
    async _onRefresh(){
        try {
            this.setState({isRefreshing : true})
            this.state.listQuery = {
                ...this.state.listQuery,
                pageNo: 1,
                pageSize: 20
            }
            await this._getData()
            this.setState({isRefreshing : false})
        } catch (error) {
            this.setState({isRefreshing : false})
            console.error(error);
        }
    }
    _onChangeText(text){
        this.state.listQuery = {
            ...this.state.listQuery,
            nodeId: text,
            pageNo: 1,
            pageSize: 20
        }
        this._getData();
    }
    async _onEndReached(info){
        try {
            // this.setState({isRefreshing : true})
            this.state.listQuery = {
                ...this.state.listQuery,
                pageNo: this.state.listQuery.pageNo+1,
                pageSize: 20
            }
            await this._getData(true)
            // this.setState({isRefreshing : false})
        } catch (error) {
            // this.setState({isRefreshing : false})
            console.error(error);
        }
    }
    _dateFormDate(timestamp){
        // let date = new Date(timestamp);
        let day = ~~(timestamp/86400000);
        let hour = ~~(timestamp%86400000/3600000);
        let minute = ~~(317851018%3600000/60000);
        let seconds = ~~(317851018%60000/1000);
        // let milliSeconds = timestamp%1000;
        return `${day}:${hour}:${minute}:${seconds}`;
    }
    _renderItem({item,index,list}){
        const { theme,t } = this.props;
        const textColor = { color: theme.body.color };
        return (
            <View style={{flex: 1,flexDirection: "row",}}>
                <Text numberOfLines={1} style={[styles.textGrow,textColor,{textAlign: "left"}]}>
                    {item.nodeId}
                </Text>
                <Text numberOfLines={1} style={[styles.textGrow,textColor,{textAlign: "left"}]}>
                    {item.nodeName}
                 </Text>
                <Text numberOfLines={1} style={[styles.textGrow,textColor,{textAlign: "right"}]}>
                    {this._dateFormDate(item.runTime)}
                </Text>
                <Text numberOfLines={1} style={[styles.textSmallGrow,textColor,{textAlign: "right"}]}>
                    {item.status?t('ltc:run'):t('ltc:close')}
                </Text>
            </View>
        )
    }
    render() {
        const { theme,ltcList,t } = this.props;
        const {isRefreshing} = this.state;
        const textColor = { color: theme.body.color };
        return (
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor="#999999"
                            selectionColor="#999999"
                            
                            placeholder={t('ltc:searchPlaceholder')}
                            onChangeText={this._onChangeText}
                        />
                    </View>
                    <View style={styles.topContainer}>
                        <Text numberOfLines={1} ellipsizeMode="clip" style={[styles.textGrow,textColor,{textAlign: "left"}]}>{t('ltc:label1')}</Text>
                        <Text numberOfLines={1} ellipsizeMode="clip" style={[styles.textGrow,textColor,{textAlign: "left"}]}>{t('ltc:label2')}</Text>
                        <Text numberOfLines={1} ellipsizeMode="clip" style={[styles.textGrow,textColor,{textAlign: "right"}]}>{t('ltc:label3')}</Text>
                        <Text numberOfLines={1} ellipsizeMode="clip" style={[styles.textSmallGrow,textColor,{textAlign: "right"}]}>{t('ltc:label4')}</Text>
                    </View>
                    <OptimizedFlatList 
                        contentContainerStyle={styles.contentContainer}
                        data={ltcList}
                        initialNumToRender={2}
                        keyExtractor={(item, index) => index.toString()}
                        scrollEnabled={ltcList.length>0&&!isRefreshing}
                        renderItem={this._renderItem}
                        onEndReached={this._onEndReached}
                        onEndReachedThreshold={0.01}
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefreshing}
                                onRefresh={this._onRefresh}
                                tintColor={theme.primary.color}
                            />
                        }
                    >
                    </OptimizedFlatList>
                </View>
           
        );
    }
}

const mapStateToProps = (state) => ({
    theme: getThemeFromState(state),
    ltcList: state.ltcList.list
});

const mapDispatchToProps = {
    getData
};

export default WithManualRefresh()(withTranslation(['global','ltc'])(connect(mapStateToProps, mapDispatchToProps)(Test)));
