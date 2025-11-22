import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: 'white',
  },

  atas: {
    // flex: 0,
    height: '20%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '5%',
    paddingRight: '5%',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },

  h1: {
    fontWeight: 'bold',
    fontSize: 24,
  },

  bawah: {
    flex: 1,
    marginTop: 20,
  },

  pointerBar: {
    backgroundColor: '#dedede',
    alignSelf: 'center',
    width: '90%',
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  itemBar: {
    width: 80,
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemBarActive: {
    elevation: 2,
    backgroundColor: 'white',
  },


  bodyList: {
    flex: 1,
    alignSelf: 'center',
    width: '90%',
  },
  
  bodyPost: {
    padding: 10,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: 'white',
    borderLeftWidth: 5,
    borderLeftColor: '#2a85d0',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    elevation: 1,
  },

  bodyPostItemLeft: {
    flexDirection: 'row',
    gap: 5,
  },
  
  bodyPostItemRight: {
    flexDirection: 'row',
    gap: 15,
  },

  


  buttonAdd: {
    backgroundColor: '#51a7fc',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1%',
    position: 'absolute',
    bottom: '2%',
    right: 20,
    borderRadius: 999,
  },

  buttonCheck: {
    padding: 6,
  },

  checkActivated: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default styles;