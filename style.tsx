import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: 'white',
  },

  atasWrapper: {
    justifyContent: 'flex-end',
    height: '18%',
    paddingLeft: '5%',
    paddingRight: '5%',
    gap: 15,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },

  atas: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    flexDirection: 'row',
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
  },

  buttonComplete: {
    marginTop: 20,
    width: '100%',
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#2a85d0',
    borderRadius: 5
  },



  titleModal: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  titleProject: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#757575ff',
  },

  textModal: {
    fontSize: 14,
    marginBottom: 15,
  },



  inputBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 14,
    marginTop: 5,
  },

  projectSelect: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  projectSelectText: {
    fontSize: 14,
    color: '#333333',
  },
  projectSelectIcon: {
    fontSize: 12,
    color: '#777777',
  },

  projectDropdown: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  projectOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  projectOptionActive: {
    backgroundColor: '#E0F7FA',
  },
  projectDot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    marginRight: 8,
    backgroundColor: '#B0BEC5',
  },
  projectOptionText: {
    fontSize: 14,
    color: '#333333',
  },



  banner: {
    marginHorizontal: 16,
    marginBottom: 8,
    marginTop: 4,
    padding: 10,
    borderRadius: 8,
  },
  bannerSuccess: {
    backgroundColor: '#E6F9F0',
    borderColor: '#2ecc71',
    borderWidth: 1,
  },
  bannerError: {
    backgroundColor: '#FDECEA',
    borderColor: '#e74c3c',
    borderWidth: 1,
  },
  bannerText: {
    color: '#333',
    fontSize: 13,
  },



  progressWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  progressCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: '#2a85d0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  progressPercent: {
    fontWeight: '700',
    fontSize: 14,
  },

  overdueBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#FDECEE', // merah lembut
  },

  overdueText: {
    marginLeft: 8,
    color: '#D93025',
    fontSize: 13,
    fontWeight: '600',
  },

  tabInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  badge: {
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5F8F0', // hijau muda default
  },

  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'black',
  },
});

export default styles;